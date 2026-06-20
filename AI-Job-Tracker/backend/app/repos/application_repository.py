from sqlalchemy.orm import Session
from sqlalchemy import desc, asc

from app.models.company import Company
from app.models.application import Application
from app.repos.company_repository import CompanyRepository
from app.core.logger import get_logger

logger = get_logger(__name__)

class ApplicationRepository:
    @staticmethod
    def create(db: Session, **application_data):
        application = Application(**application_data)
        logger.debug(f"Repository application before add: {application}")
        logger.debug(f"has company_name property: {hasattr(application, 'company_name')}")
        
        db.add(application)
        db.commit()
        db.refresh(application)
        
        logger.debug(f"Repository application after refresh: {application}")
        logger.debug(f"Company relation refresh after refresh: {application.company}")
        logger.debug(f"company name after refresh: {getattr(application, 'company_name', None)}")
        
        return application
    
    @staticmethod
    def get_all_by_user(
        db: Session,
        user_id: int,
        status: str | None = None,
        search: str | None = None,
        page: int = 1,
        limit: int = 10,
        sort: str = "newest"
    ):
        query = db.query(Application).filter(Application.user_id == user_id)
        logger.debug(f"Base count: {query.count()}")
        
        if status:
            query = query.filter(Application.status == status)
            logger.debug(f"After status filter count: {query.count()}")
        
        if search:
            logger.debug(f"SEARCHING COMPANY NAME FOR: {search}")
            
            query = query.join(Application.company).filter(
                Company.company_name.ilike(f"%{search}%")
            )
            logger.debug(f"AFTER SEARCH FILTER: {query.count()}")
            
        if sort == "newest":
            query = query.order_by(desc(Application.created_at))
        
        if sort == "oldest":
            query = query.order_by(asc(Application.created_at))
        
        results = (
            query.offset((page - 1) * limit).limit(limit).all()
        )
        
        logger.debug(f"Final result count: {len(results)}")
        logger.debug(f"Final results: {[getattr(app, 'company_name') for app in results]}")
        
        return results
        
    @staticmethod
    def get_by_user_and_id(db: Session, user_id: int, application_id: int):
        application = (
            db.query(Application)
            .filter(Application.user_id == user_id, Application.id == application_id)
            .first()
        )
        
        logger.debug(f"Get by user and id result: {application}")
        return application
        
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
        
    # this is for the dashbaord
    @staticmethod
    def get_dashboard_stats(db, user_id: int):
        applications = db.query(Application).filter(Application.user_id == user_id).all()
        
        stats = {
            "total": len(applications),
            "wishlist": 0,
            "applied": 0,
            "rejected": 0,
            "interview": 0,
            "offer": 0
        }
        for application in applications:
            stats[application.status.value] += 1
        return stats