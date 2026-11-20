from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService


router = APIRouter()

@router.post("/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
def upload_document(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    return DocumentService.upload_resume(
        db,
        current_user.id,
        file
    )
    
# get a bunch of documents
@router.get("", response_model=list[DocumentResponse], status_code=status.HTTP_200_OK)
def get_documents(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return DocumentService.get_user_documents(
        db,
        current_user.id
    )
    
# getting a single document with a unique id
@router.get("/{document_id}", response_model=DocumentResponse, status_code=status.HTTP_200_OK)
def get_document(
    document_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    document = DocumentService.get_user_document(
        db,
        current_user.id,
        document_id
    )
    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )
    return document

@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    document_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    deleted_content = DocumentService.delete_document(
        db,
        current_user.id,
        document_id
    )
    
    if not deleted_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document was not found"
        )
        
    return None