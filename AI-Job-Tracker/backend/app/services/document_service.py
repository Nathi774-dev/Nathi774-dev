import os
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.repos.document_repository import DocumentRepository

# The folders needed for upload
UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class DocumentService:
    @staticmethod
    def upload_resume(db: Session, user_id: int, file: UploadFile):
        filename = f"{user_id}_{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return DocumentRepository.create(
            db,
            {
                "filename": filename,
                "file_path": filepath,
                "file_type": file.content_type,
                "user_id": user_id
            }
        )
        
    @staticmethod
    def get_user_documents(db: Session, user_id: int):
        return DocumentRepository.get_all_documents_by_user(
            db,
            user_id
        )
        
    @staticmethod
    def get_user_document(db: Session, user_id: int, document_id: int):
        return DocumentRepository.get_document_by_user_id(
            db,
            user_id,
            document_id
        )
        
    @staticmethod
    def delete_document(db: Session, user_id: int, document_id: int):
        document = DocumentRepository.get_document_by_user_id(
            db,
            user_id,
            document_id
        )
        
        if not document:
            return False
        if os.path.exists(document.file_path):
            os.remove(document.file_path)
        DocumentRepository.delete(db, document)
        
        return True