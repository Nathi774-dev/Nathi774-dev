from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.interview import (
    InterviewCreate,
    InterviewUpdate,
    InterviewResponse
)
from app.services.interview_service import InterviewService

router = APIRouter()

@router.post("", response_model=InterviewResponse, status_code=status.HTTP_201_CREATED)
def create_interview(
    interview_data: InterviewCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    interview = InterviewService.create_interview(
        db,
        current_user.id,
        interview_data.model_dump()
    )
    
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    return interview

@router.get("", response_model=InterviewResponse, status_code=status.HTTP_200_OK)
def get_interviews(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return InterviewService.get_interviews(
        db,
        current_user.id
    )
    
@router.get("/{interview_id}", response_model=InterviewResponse)
def get_interview(
    interview_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    interview = InterviewService.get_interview(
        db,
        current_user.id,
        interview_id
    )
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Interview not found"
        )
    return interview

@router.path("/{interview_id}", response_model=InterviewResponse)
def update_interview(
    interview_id: int,
    interview_data: InterviewUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    interview = InterviewService.update_interview(
        db,
        current_user.id,
        interview_id,
        interview_data.model_dump()
    )
    
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Interview not found"
        )
        
    return interview

@router.delete("{interview_id}", response_model=InterviewResponse, status_code=status.HTTP_204_NO_CONTENT)
def delete_interview(
    interview_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    deleted_content = InterviewService.delete_interview(
        db,
        current_user.id,
        interview_id
    )
    
    if not deleted_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Interview not found"
        )
        
    return None     # for removed content