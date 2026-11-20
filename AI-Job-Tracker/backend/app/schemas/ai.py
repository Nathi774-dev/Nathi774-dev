from pydantic import BaseModel

class AIResumeAnalyzerResponse(BaseModel):
    score: int
    strengths: list[str]
    weaknesses: list[str]
    missing_skills: list[str]
    ats_score: int
    suggesstions: list[str]
    
class JobMatchRequest(BaseModel):
    document_id: int
    job_description: str
    
class JobMatchResponse(BaseModel):
    match_score: int
    matching_skills: list[str]
    missing_skills: list[str]
    recommended_skills: list[str]
    resume_improvements: list[str]
    summary: str
    
class InterviewCoachRequest(BaseModel):
    document_id: int
    job_description: str
    role: str
    company_name: str
    
class InterviewCoachResponse(BaseModel):
    technical_questions: list[str]
    behavioral_questions: list[str]
    company_questions: list[str]
    tips: list[str]
    
class CoverLetterRequest(BaseModel):
    document_id: int
    company_name: str
    job_title: str
    hiring_manager: str | None = None
    job_description: str
    
class CoverLetterResponse(BaseModel):
    cover_letter: str
    
class ResumeRewriteRequest(BaseModel):
    document_id: int
    
class ResumeRewriteResponse(BaseModel):
    rewritten_resume: str
    
class MockInterviewQuestionRequest(BaseModel):
    document_id: int
    job_title: str
    company_name: str
    job_description: str
    question_type: str = "mixed"
    
class MockInterviewQuestionResponse(BaseModel):
    question: str
    question_type: str
    
class MockInterviewEvaluateRequest(BaseModel):
    question: str
    answer: str
    job_title: str
    company_name: str
    
class MockInterviewEvaluateResponse(BaseModel):
    overall_score: int
    technical_score: int
    communication_score: int
    confidence_score: int
    feedback: str
    strengths: list[str]
    areas_for_improvement: list[str]
    improved_answer: str