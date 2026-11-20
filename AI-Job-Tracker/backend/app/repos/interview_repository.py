from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.application import Application

class InterviewRepository:
    @staticmethod
    def create(db: Session, interview_data: dict):
        interview = Interview(**interview_data)
        db.add(interview)
        db.commit()
        db.refresh(interview)
        
        return interview
    
    @staticmethod
    def get_all_by_user(db: Session, user_id: int):
        return (
            db.query(Interview)
            .join(Application)
            .filter(Application.user_id == user_id)
            .order_by(Interview.interview_date.asc()).all()
        )
        
    @staticmethod
    def get_by_user_and_id(db: Session, user_id: int, interview_id: int):
        return (
            db.query(Interview)
            .join(Application)
            .filter(Interview.id == interview_id, Application.user_id == user_id).first()
        )
        
    @staticmethod
    def update(db: Session, interview: Interview, update_data: dict):
        for key, val in update_data.items():
            if val is not None:
                setattr(interview, key, val)
        db.commit()
        db.refresh(interview)
        return interview
    
    @staticmethod
    def delete(db: Session, interview: Interview):
        db.delete(interview)
        db.commit()