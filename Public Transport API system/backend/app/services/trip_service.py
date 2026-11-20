from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.trip import Trip

def create_trip(
    db: Session,
    vehicle_id: int,
    route_id: int,
    scheduled_start: datetime,
    status: str,
    scheduled_end: datetime | None = None
) -> Trip:
    trip = Trip(
        vehicle_id=vehicle_id,
        route_id=route_id,
        scheduled_end=scheduled_end,
        scheduled_start=scheduled_start,
        status=status
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    
    return trip
    
def start_trip(db: Session, trip_id: int) -> Trip | None:
    trip = db.get(Trip, trip_id)
    
    if not trip:
        return None
    
    trip.actual_start = datetime.utcnow()
    trip.status = "in_progress"
    
    db.commit()
    db.refresh(trip)
    
    return trip

def complete_trip(db: Session, trip_id) -> Trip | None:
    trip = db.get(Trip, trip_id)
    
    if not trip:
        return None
    
    trip.actual_end = datetime.utcnow()
    trip.status = "completed"
    db.commit()
    db.refresh(trip)
    
def get_trip(db: Session, trip_id: int) -> Trip | None:
    return db.get(Trip, trip_id)