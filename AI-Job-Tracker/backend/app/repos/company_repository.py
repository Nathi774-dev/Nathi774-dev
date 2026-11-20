from sqlalchemy.orm import Session
from app.models.company import Company

class CompanyRepository:
    @staticmethod
    def get_by_name(db: Session, name: str):
        return db.query(Company).filter(Company.company_name == name).first()
    
    @staticmethod
    def create(db: Session, name: str):
        company = Company(company_name=name)
        db.add(company)
        db.commit()
        db.refresh(company)
        return company