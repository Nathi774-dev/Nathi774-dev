from sqlalchemy.orm import Session
from app.models.document import Document

class DocumentRepository:
    @staticmethod
    def create(db: Session, document_data: dict):
        document = Document(**document_data)
        
        db.add(document)
        db.commit()
        db.refresh(document)
        
        return document
    
    @staticmethod
    def get_all_documents_by_user(db: Session, user_id: int):
        return db.query(Document).filter(Document.user_id == user_id).order_by(Document.created_at.desc()).all()
    
    @staticmethod
    def delete(db: Session, document: Document):
        db.delete(document)
        db.commit()
        
    @staticmethod
    def get_document_by_user_id(db: Session, user_id: int, document_id: int):
        return (
            db.query(Document)
            .filter(Document.id == document_id, Document.user_id == user_id).first()
        )