from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.ai import (
    AIResumeAnalyzerResponse, 
    JobMatchResponse, 
    JobMatchRequest,
    CoverLetterRequest,
    CoverLetterResponse,
    ResumeRewriteRequest,
    ResumeRewriteResponse,
    MockInterviewQuestionRequest,
    MockInterviewQuestionResponse,
    MockInterviewEvaluateRequest,
    MockInterviewEvaluateResponse
)
from app.services.ai_service import AIService


router = APIRouter()

@router.post("/analyze-resume/{document_id}", response_model=AIResumeAnalyzerResponse)
def analyze_resume(document_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        return AIService.analyze_resume(db, current_user.id, document_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.post("/generate-cover-letter", response_model=CoverLetterResponse)
def generate_cover_letter(
    data: CoverLetterRequest, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    try:
        return AIService.generate_cover_letter(
            db,
            current_user.id,
            data.document_id,
            data.company_name,
            data.job_title,
            data.job_description,
            data.hiring_manager
        )
    except ValueError as e:
        raise HTTPException(status=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.post("/rewrite-resume", response_model=ResumeRewriteResponse)
def rewrite_resume(
    data: ResumeRewriteRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        return AIService.rewrite_resume(db, current_user.id, data.document_id)
    except ValueError as e:
        raise HTTPException(status=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.post("/job-match", response_model=JobMatchResponse)
def job_match(
    data: JobMatchRequest, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    try:
        return AIService.analyze_job_match(db, current_user.id, data.document_id, data.job_description)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/mock-interview/question", response_model=MockInterviewQuestionResponse)
def generate_mock_interview_question(
    data: MockInterviewQuestionRequest,
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    try:
        return AIService.generate_mock_interview_question(
            db,
            current_user.id,
            data.document_id,
            data.job_title,
            data.job_description,
            data.company_name,
            data.question_type
        )
    except ValueError as err:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    
@router.post("/mock-interview/evaluate", response_model=MockInterviewEvaluateResponse)
def generate_mock_interview_evaluation(
    data: MockInterviewEvaluateRequest
):
    return AIService.evaluate_mock_interview_answer(
        data.question,
        data.answer,
        data.job_title,
        data.company_name
    )