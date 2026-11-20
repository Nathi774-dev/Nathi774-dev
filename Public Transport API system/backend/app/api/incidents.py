from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin
from app.schemas import IncidentCreate, IncidentResponse
from app.services import (
    create_incident,
    get_incident,
    get_open_incidents,
    resolve_incidents    
)
from app.models import User

router = APIRouter(prefix="/incidents", tags=["Incidents"])

@router.post("/", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
def register_new_incident(data: IncidentCreate, db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    return create_incident(db=db, **data)

@router.get("/{incident_id}", response_model=IncidentResponse, status_code=status.HTTP_200_OK)
def read_incident(incident_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    incident = get_incident(db, incident_id)
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident does not exist.")
    return incident

@router.get("/", response_model=list[IncidentResponse], status_code=status.HTTP_200_OK)
def read_open_incidents(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    return get_open_incidents(db)

@router.post("/{incident_id}/resolve", response_model=IncidentResponse)
def resolve_incident_by_id(incident_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    resolved_incident = resolve_incidents(db, incident_id)
    if not resolved_incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident does not exist.")
    return resolved_incident