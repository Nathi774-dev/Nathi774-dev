# These routes will be connected a graph like frontend
# with react
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.application import Application
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.application_service import ApplicationService

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # a dashboard stats function that takes db and the user id as parameters
    # goes here
    applications = db.query(Application).filter(Application.user_id == current_user.id).all()
    stats = {
        "total": len(applications),
        "wishlist": 0,
        "applied": 0,
        "interview": 0,
        "offer": 0,
        "rejected": 0
    }
    
    for application in applications:
        status = application.status
        if hasattr(status, "value"):
            status = status.value
        stats[status] += 1
    return stats