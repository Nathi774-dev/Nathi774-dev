from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.application import ApplicationCreate, ApplicationResponse, ApplicationUpdate
from app.services.application_service import ApplicationService

router = APIRouter()

# All routes here will be prefixed with /application
# So we leave the first arguments with ""
@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(
    application_data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return ApplicationService.create_application(
        db,
        application_data.model_dump(),
        current_user.id
    )
    
@router.get("", response_model=list[ApplicationResponse], status_code=status.HTTP_200_OK)
def get_applications(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return ApplicationService.get_applications(db, current_user.id)

@router.get("/{application_id}", response_model=ApplicationResponse, status_code=status.HTTP_200_OK)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    application = ApplicationService.get_application(
        db, current_user.id, application_id
    )
    if not application:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="application not found")
    return application

# These are the remainder of the routes that are needed for applications
@router.patch("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application_data: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    application = ApplicationService.update_application(
        db,
        application_id,
        current_user.id,
        application_data.model_dump()
    )
    
    if not application:
        raise HTTPException(
            status=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    return application

@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    deleted_content = ApplicationService.delete_application(
        db,
        application_id,
        current_user.id
    )
    
    if not deleted_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    return None