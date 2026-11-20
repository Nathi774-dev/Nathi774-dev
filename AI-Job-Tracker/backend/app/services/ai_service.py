from sqlalchemy.orm import Session
from pathlib import Path
from pypdf import PdfReader
from docx import Document
import json
from google import genai
from sqlalchemy.orm import Session

from app.core.config import settings
from app.repos.document_repository import DocumentRepository

client = genai.Client(api_key=settings.GEMINI_API_KEY)

class AIService:
        
    @staticmethod
    def extract_docx(file_path: str):
        document = Document(file_path)
        return "\n".join(paragraph.text for paragraph in document.paragraphs)
        
    @staticmethod
    def extract_pdf(file_path: str):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            extract = page.extract_text()
            
            if extract:
                text += extract + "\n"
        return text

    @staticmethod
    def extract_text(file_path: str):
        extension = Path(file_path).suffix.lower()
        if extension == ".pdf":
            return AIService.extract_pdf(file_path)
        elif extension == ".docx":
            return AIService.extract_docx(file_path)
        else:
            raise ValueError("Unsupported file extension")
        
    @staticmethod
    def analyze_job_match(db: Session, user_id: int, document_id: int, job_description: str):
        document = DocumentRepository.get_by_user_and_id(
            db, user_id, document_id
        )
        
        if not document:
            raise ValueError("Error, document not found")
        resume_text = AIService.extract_text(document.file_path)
        prompt = f"""
        You are an expert in matching resumes to job descriptions and ATS Job matching.
        Return ONLY valid JSON with this exact structure:
        {{
            "match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "recommended_skills": [],
            "resume_improvements": [],
            "summary": ""
        }}
        Compare this resume to this job description
        Resume:
        {resume_text}
        
        Job Description:
        {job_description}
        """
        response = client.models.generate_content(model="gemini-2.0.flash", contents=prompt)
        cleaned = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned)
        
    @staticmethod
    def analyze_resume(db: Session, user_id: int, document_id: int):
        document = DocumentRepository.get_all_documents_by_user(
            db,
            user_id
        )
        if not document:
            raise ValueError("Error, documents not found")
        resume_text = AIService.extract_text(document.file_path)
        
        # Here is where we call the GenAI API to analyse the text
        prompt = f"""
                You are an expert ATS resume reviewer.
                Return ONLY valid JSON with this exact structure:
                {{
                    "score": 0,
                    "ats_score": 0,
                    "strengths": [],
                    "weaknesses": [],
                    "missing_skills": [],
                    "suggestions": []
                }}

                Analyze this resume:

                {resume_text}
                """
        response = client.models.generate_content(model="gemini-2.0-flash", content=prompt)
        try:
            return json.loads(response.text)
        except json.JSONDecodeError:
            cleaned = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned)
            
    @staticmethod
    def generate_cover_letter(
        db: Session,
        user_id: int,
        document_id: int,
        company_name: str,
        job_title: str,
        job_description: str,
        hiring_manager: str | None = None
    ):
        document = DocumentRepository.get_document_by_user_id(
            db, user_id, document_id
        )
        
        if not document:
            raise ValueError("Error, document not found")
        resume_text = AIService.extract_text(document.file_path)
        manager_line = f"Hiring manager: {hiring_manager}" if hiring_manager else "Hiring manager: not provided"
        
        prompt = f"""
        You are a professional career coach.
        Write a personalized cover letter.
        Rules:
        - Formal Tone
        - One page max
        - Mention relevant experience from the resume
        - Do not invent experience or skills
        - Do not include any information not present in the resume or job description
        - Do not use markdown
        - Return ONLY the cover letter text
        
        Company: {company_name}
        Job Title: {job_title}
        {manager_line}
        
        Job Description: {job_description}
        """
        response = client.models.generate(model="gemini-2.0-flash", content=prompt)
        return {"cover_letter": response.text.strip()}
    
    @staticmethod
    def rewrite_resume(db: Session, user_id: int, document_id: int):
        document = DocumentRepository.get_document_by_user_id(db, user_id, document_id)
        if not document:
            raise ValueError("Error, document not found")
        resume_text = AIService.extract_text(document.file_path)
        prompt = f"""
        You are an expert resume writer.
        Your job is to  rewrite this resume to make it more effective and professional.
        Rules:
        - Do not invent skills or job experiences
        - Use the details provided by the user
        - Return ONLY the rewritten resume text
        Resume:
        {resume_text}
        """
        response = client.models.generate(model="gemini-2.0-flash", content=prompt)
        clean_response = response.text.replace("```", "").replace("```", "").strip()
        return json.loads(clean_response)
        
    @staticmethod
    def generate_mock_interview_question(
        db: Session,
        user_id: int,
        document_id: int,
        job_title: str,
        job_description: str,
        company_name: str,
        question_type: str
    ):
        document = DocumentRepository.get_document_by_user_id(db, user_id, document_id)
        if not document:
            raise ValueError("Error, document not found")
        resume_text = AIService.extract_text(document.file_path)
        prompt = f"""
        You are a professional interview coach.
        Generate a {question_type} question for the {job_title} position at {company_name}.
        This is the candidate's resume:
        {resume_text}
        
        Rules:
        - Ask about the candidate's experience related to the job description
        - Do not invent information
        - Return ONLY the question text
        - return only valid JSON
        This should be the JSON structure:
        {{
            "question": "",
            "question_type": "{question_type}"
        }}
        """
        
        response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        clean_response = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_response)
    
    @staticmethod
    def evaluate_mock_interview_answer(
        question: str,
        answer: str,
        job_title: str,
        company_name: str
    ):
        prompt = f"""
        You are a senior interviewer. Evaluate the candidate's answer.
        
        Job title: {job_title}
        Company name: {company_name}
        Question: {question}
        Candidate's answer:
        {answer}
        
        Return ONLY valid JSON.
        
        {{
            "overall_score": 0,
            "technical_score": 0,
            "communication_score": 0,
            "feedback": "",
            "strengths": [],
            "areas_for_improvement": [],
            "improved_answer: ""
        }}
        """
        
        response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        clean_response = response.text.replace("```json", "").replace("```", "").strip()
        
        return json.loads(clean_response)
        