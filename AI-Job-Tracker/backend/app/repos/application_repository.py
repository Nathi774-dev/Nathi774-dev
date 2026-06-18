from sqlalchemy.orm import Session

from app.models.application import Application

class ApplicationRepository:
    @staticmethod
    def create(db: Session, **application_data):
        application = Application(**application_data)
        
        db.add(application)
        db.commit()
        db.refresh(application)
        
        return application
    
    @staticmethod
    def get_all_by_user(db: Session, user_id: int):
        return (
            db.query(Application)
            .filter(Application.user_id == user_id)
            .all()
        )
        
    @staticmethod
    def get_by_user_and_id(user_id: int, db: Session, application_id: int):
        return (
            db.query(Application)
            .filter(Application.user_id == user_id, Application.id == application_id)
            .first()
        )
        
    @staticmethod
    def update_application(db: Session, application, update_data: dict):
        for key, val in update_data.items():
            if val is not None:
                setattr(application, key, val)
        db.commit()
        db.refresh(application)
        return application
    
    @staticmethod
    def delete_application(db: Session, application):
        db.delete(application)
        db.commit()