from datetime import datetime, timezone, timedelta
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Incident, Vehicle
from app.automation.severity import get_severity

HIGH_DEMAND_THRESHOLD = 0.90

def check_vehicle_demand(db: Session) -> list[Incident]:
    """This allows us to check if a vehicle needs maintenance based on demand"""
    print("Checking the vehicle demand.")
    now = datetime.now(timezone.utc)
    # Only choose active incidents
    vehicles = db.scalars(
        select(Vehicle).where(
            Vehicle.status == "active",
        )
    ).all()
    
    created_incidents = []
    for vehicle in vehicles:
        if not vehicle.capacity or vehicle.capacity <= 0:
            continue
        if vehicle.passenger_count is None:
            continue
        
        # the threshold and occupancy are in percentages
        occupancy = round((vehicle.passenger_count / vehicle.capacity) * 100, 2)
        if occupancy <= (HIGH_DEMAND_THRESHOLD * 100):
            continue
        
        # to prevent duplicate open incidents
        existing_incident = db.scalar(
            select(Incident).where(
                Incident.status == "open",
                Incident.vehicle_id == vehicle.id,
                Incident.incident_type == "high_demand"
            )
        )
        
        if existing_incident:
            continue
        incident = Incident(
            vehicle_id=vehicle.id,
            incident_type="high_demand",
            severity=get_severity(occupancy),
            description=(
                f"Vehicle {vehicle.vehicle_number} is operating at {occupancy}% capacity"
                f"Vehicle capacity: {vehicle.passenger_count}/{vehicle.capacity}"
            ),
            status="open",
            created_at=now
        )
        
        db.add(incident)
        created_incidents.append(incident)
    if created_incidents:
        db.commit()   # Only save to the database if there are any incidents
        for incident in created_incidents:
            db.refresh(incident)
    return created_incidents