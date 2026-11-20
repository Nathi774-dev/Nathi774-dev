from sqlalchemy.orm import Session

from app.repos.interview_repository import InterviewRepository
from app.repos.application_repository import ApplicationRepository

class InterviewService:
    @staticmethod
    def create_interview(db: Session, user_id: int, interview_data: dict):
        application_id = interview_data.get("application_id")
        
        application = ApplicationRepository.get_by_user_and_id(
            db,
            user_id,
            application_id
        )
        if not application:
            return None
        return InterviewRepository.create(
            db,
            interview_data
        )
        
    @staticmethod
    def get_interviews(db: Session, user_id: int):
        return InterviewRepository.get_all_by_user(
            db, user_id
        )
        
    @staticmethod
    def get_interview(interview_id: int, db: Session, user_id: int):
        return ApplicationRepository.get_by_user_and_id(
            db, user_id, interview_id
        )
        
    @staticmethod
    def update_interview(interview_id: int, update_data: dict, db: Session, user_id: int):
        interview = InterviewRepository.get_by_user_and_id(
            db,
            user_id,
            interview_id
        )
        
        if not interview:
            return None
        
        return InterviewRepository.update(
            db,
            interview,
            update_data
        )
        
    @staticmethod
    def delete_interview(interview_id: int, db: Session, user_id: int):
        interview = InterviewRepository.get_by_user_and_id(
            db,
            user_id,
            interview_id
        )
        
        return InterviewRepository.delete(
            db,
            interview
        )    # This is suppose to return None