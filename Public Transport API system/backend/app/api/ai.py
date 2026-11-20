from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.services import analyze_transport, analyze_transport_incident
from app.core import get_db, require_operator, require_admin
from app.schemas import AIRequest, AIResponse
from app.models import User

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/incidents/{incident_id}/analyze", response_model=AIResponse)
async def analyze_current_incident(
    incident_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    try:
        analysis = await analyze_transport_incident(db, incident_id)
        return {
            "incident_id": incident_id,
            "analysis": analysis
        }
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))

@router.post("/analyze", response_model=AIResponse)
async def analyze(
    request: AIRequest, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    try:
        return await analyze_transport(db, current_user.id, request.prompt, request.model_name)
    except RuntimeError as err:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(err))
    except RuntimeError as err:
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail=str(err))
    except RuntimeError as err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(err))