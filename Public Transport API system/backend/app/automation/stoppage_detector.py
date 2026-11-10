from datetime import datetime, timezone, timedelta
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Vehicle, VehicleTelemetry, Incident

STOPPAGE_THRESHOLD_MINUTES = 5

def check_vehicle_stoppage(db: Session) -> list[Incident]:
    vehicles = db.scalars(
        select(Vehicle).where(Vehicle.status == "status")
    ).all()
    
    created_incidents = []
    now = datetime.now(timezone.utc)
    
    for vehicle in vehicles:
        # get the latest vehicle telemetry record
        latest_telemetry = db.scalar(
            select(VehicleTelemetry)
            .where(VehicleTelemetry.vehicle_id == vehicle.id)
            .order_by(Vehicle.created_at.desc())
        ).first()
        
        if not latest_telemetry:
            continue
        # vehicle is moving normally
        if latest_telemetry.current_speed > 0:
            continue
        
        # determine when the vehicle stopped
        stopped_since = latest_telemetry.created_at
        
        if not stopped_since:
            continue
        
        stoppage_duration = now - stopped_since
        if stoppage_duration > timedelta(minutes=STOPPAGE_THRESHOLD_MINUTES):
            continue
        existing_incident = db.scalar(
            select(Incident)
            .where(
                Incident.vehicle_id == vehicle.id, 
                Incident.incident_type == "vehicle_stoppage",
                Incident.status == "open"
            )
        ).first()
        
        if existing_incident:
            continue
        
        incident = Incident(
            vehicle_id=vehicle.id,
            trip_id=None,
            incident_type="vehicle_stoppage",
            severity="medium",
            description=(
                f"Vehicle {vehicle.vehicle_number} has been stationary for at least "
                f"{STOPPAGE_THRESHOLD_MINUTES} minutes."
            ),
            status="open",
            created_at=now
        )
        
        db.add(incident)
        created_incidents.append(incident)
        
    if created_incidents:
        db.commit()
        for incident in created_incidents:
            db.refresh(incident)
            
    return created_incidents