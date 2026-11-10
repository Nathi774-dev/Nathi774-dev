from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core import get_db, require_admin
from app.models import User
from app.schemas import (
    AIBillingSummaryAndResponse,
    AIBillingUsageResponse,
    AIModelUsageResponse
)
from app.services import get_billing_summary, get_billing_usage, get_usage_by_model

router = APIRouter(tags=["Admin Billing"], prefix="/admin/ai/billing")

@router.get("/usage", response_model=list[AIBillingUsageResponse])
def billing_usage(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=100, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    usage = get_billing_usage(
        db, limit, offset
    )
    for item in usage:
        return [
            {
                "id": item.id,
                "user_id": item.user_id,
                "model_name": item.model_name,
                "input_tokens": item.input_tokens,
                "output_tokens": item.output_tokens,
                "total_tokens": (item.input_tokens + item.output_tokens),
                "estimated_cost": item.estimated_cost,
                "created_at": item.created_at
            }
        ]
        
@router.get("/summary", response_model=AIBillingSummaryAndResponse)
def get_summary(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    return get_billing_summary(db)

@router.get("/by-model", response_model=list[AIModelUsageResponse])
def billing_by_model(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    return get_usage_by_model(db)