from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.reminder import ReminderResponse
from app.services.reminder_service import ReminderService


router = APIRouter()

# We only need 1 route in order to remind the user of any upcoming interviews
@router.get("", response_model=list[ReminderResponse], status_code=status.HTTP_200_OK)
def get_reminders(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return ReminderService.get_reminders(
        db,
        current_user.id
    )