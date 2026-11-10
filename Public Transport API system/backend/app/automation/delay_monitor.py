from datetime import datetime, timezone, timedelta
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Trip, Incident

DELAY_THRESHOLD_MINUTES = 20

def check_trip_delay(db: Session) -> list[Incident]:
    now = datetime.now(timezone.utc)
    threshold = now - timedelta(minutes=DELAY_THRESHOLD_MINUTES)
    
    delayed_trips = db.scalars(
        select(Trip).where(
            Trip.status == "scheduled",
            Trip.actual_start.is_(None),
            Trip.scheduled_start <= threshold
        )
    ).all()

    created_incident = []
    
    for trip in delayed_trips:
        existing_incident = db.scalar(
            select(Incident)
            .where(
                Incident.trip_id == trip.id, 
                Incident.status == "open", 
                Incident.incident_type == "trip_delay"
            )
        )
        
        if existing_incident:
            continue
        incident = Incident(
            vehicle_id=trip.vehicle_id,
            trip_id=trip.id,
            severity="medium",
            incident_type="trip_delay",
            description=(
                f"Trip {trip.id} has not started within "
                f"{DELAY_THRESHOLD_MINUTES} of it's scheduled "
                f"start time."
            ),
            status="open",
            created_at=now
        )
        
        db.add(incident)
        created_incident.append(incident)
        
        if created_incident:
            db.commit()
            for incident in created_incident:
                db.refresh(incident)
            
    return created_incident        
