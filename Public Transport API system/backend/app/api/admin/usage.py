from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core import get_db, require_admin
from app.models import User, AIUsage
from app.schemas import AIUsageResponse

router = APIRouter(prefix="/admin/ai", tags=["Admin AI"])

@router.get("/usage", response_model=AIUsageResponse)
def get_ai_usage(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    return db.scalars(select(AIUsage).order_by(AIUsage.created_at.desc())).all()