from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core import get_db, require_company_admin
from app.models import User
from app.schemas import InvitationResponse
from app.services import create_invitation_code

router = APIRouter(prefix="/admin/auth", tags=["Invitation Codes"])

@router.post("/invitations", response_model=InvitationResponse, status_code=status.HTTP_200_OK)
def generate_invitation(
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_company_admin)
):
    """Finds the company of that user and generates a code for that company"""
    try:
        invitation = create_invitation_code(db, current_user.company_id)
        return invitation
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error)
        )
