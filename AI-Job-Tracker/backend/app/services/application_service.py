from sqlalchemy.orm import Session

from app.repos.application_repository import ApplicationRepository
from app.repos.company_repository import CompanyRepository
from app.core.logger import get_logger

logger = get_logger(__name__)

class ApplicationService:
    @staticmethod
    def create_application(db: Session, application_data: dict, user_id: int):
        company_name = application_data.pop("company_name")
        logger.debug(f"Company Name: {company_name}")
        
        company = CompanyRepository.get_by_name(db, company_name)
        logger.debug(f"Company Found: {company}")
        
        if not company:
            company = CompanyRepository.create(db, company_name)
            logger.debug(f"company CREATED: ID is {company.id}, name={company.company_name}")
            
        application_data["company_id"] = company.id
        application_data["user_id"] = user_id
        
        logger.debug(f"FINAL APPLICATION DATA: {application_data}")
        application = ApplicationRepository.create(db, **application_data)
        
        logger.debug(f"Application company ID: {application.company_id}")
        logger.debug(f"Application name attr: {getattr(application, 'company_name', None)}")
        
        return application
        
    @staticmethod
    def get_applications(
        db: Session,
        user_id: int,
        status=None,
        search=None,
        page=1,
        limit=10,
        sort="newest"
    ):
        return ApplicationRepository.get_all_by_user(
            db,
            user_id,
            status,
            search,
            page,
            limit,
            sort
        )
    
    @staticmethod
    def get_application(db: Session, user_id: int, application_id: int):
        return ApplicationRepository.get_by_user_and_id(
            db, user_id, application_id
        )
    
    @staticmethod
    def update_application(
        db: Session,
        application_id: int,
        user_id: int,
        update_data: dict
    ):
        application = ApplicationRepository.get_by_user_and_id(db, user_id, application_id)
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
            db, user_id, application_id
        )
        
        logger.debug(f"Application found for delete: {application}")
        
        if not application:
            logger.debug("DELETE FAILED: application not found")
            return False
        
        ApplicationRepository.delete_application(db, application)
        logger.debug("DELETE SUCCESS")
        return True
    
    @staticmethod
    def get_dashbaord_stats(db, user_id: int):
        return ApplicationRepository.get_dashboard_stats(db, user_id)
    
    