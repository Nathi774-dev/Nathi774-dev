from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.incident import Incident

def create_incident(
    db: Session,
    incident_type: str,
    vehicle_id: int,
    trip_id: int | None = None,
    severity: str = "medium",
    status: str | None = None,
    description: str | None = None
) -> Incident:
    incident = Incident(
        incident_type=incident_type,
        trip_id=trip_id,
        severity=severity,
        status=status,
        description=description,
        vehicle_id=vehicle_id,
        created_at=datetime.now(timezone.utc)
    )
    
    db.add(incident)
    db.commit()
    db.refresh(incident)
    
    return incident

def get_incident(db: Session, incident_id) -> Incident | None:
    return db.get(Incident, incident_id)

def get_open_incidents(db: Session) -> list[Incident]:
    incidents = select(Incident).where(Incident.status == "open")
    return list(db.scalars(incidents).all())
    
def resolve_incidents(db: Session, incident_id: int) -> Incident | None:
    incident = db.get(Incident, incident_id)
    
    if not incident:
        return None
    
    incident.status = "resolved"
    incident.resolved_at = datetime.now(timezone.utc)
    
    db.commit()
    db.refresh(incident)
    return incident
    
def get_vehicle_incident(db: Session, vehicle_id: int) -> list[Incident]:
    vehicles = (
        select(Incident)
        .where(Incident.vehicle_id == vehicle_id)
        .order_by(Incident.created_at.desc())
    )
    
    return list(db.scalars(vehicles).all())