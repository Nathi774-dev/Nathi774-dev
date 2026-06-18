from sqlalchemy.orm import Session

from app.repos.application_repository import ApplicationRepository

class ApplicationService:
    @staticmethod
    def create_application(db: Session, application_data: dict, user_id: int):
        application_data["user_id"] = user_id
        return ApplicationRepository.create(
            db, **application_data
        )
        
    @staticmethod
    def get_applications(db: Session, user_id: int):
        return ApplicationRepository.get_all_by_user(db, user_id)
    
    @staticmethod
    def get_application(db: Session, user_id: int, application_id: int):
        return ApplicationRepository.get_by_user_and_id(
            user_id=user_id,
            db=db,
            application_id=application_id
        )
    
    @staticmethod
    def update_application(
        db: Session,
        application_id: int,
        user_id: int,
        update_data: dict
    ):
        application = ApplicationRepository.get_by_user_and_id(user_id, db, application_id)
        if not application:
            return None
        
        return ApplicationRepository.update_application(db, application, update_data)
    
    @staticmethod
    def delete_application(
        db: Session,
        user_id: int,
        application_id: int
    ):
        application = ApplicationRepository.get_by_user_and_id(
            user_id, db, application_id
        )
        if not application:
            return False
        
        ApplicationRepository.delete_application(db, application)
        return True