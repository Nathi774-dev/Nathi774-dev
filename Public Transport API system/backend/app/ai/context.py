from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.models import Vehicle, Trip, Incident, Maintenance

def build_transport_context(db: Session) -> dict:
    # Vehicle information
    total_vehicles = db.scalar(select(func.count).select_from(Vehicle)) or 0
    active_vehicles = db.scalar(select(func.count).select_from(Vehicle).where(Vehicle.status == "active")) or 0
    inactive_vehicles = total_vehicles - active_vehicles
    maintenance = db.scalar(select(func.count).select_from(Vehicle).where(Vehicle.status == "maintenance")) or 0
     
    # trip information
    active_trips = db.scalar(
        select(func.count)
        .select_from(Trip)
        .where(Trip.status == "in_progress")
    ) or 0
    scheduled_trips = db.scalar(
        select(func.count)
        .select(Trip)
        .where(Trip.status == "scheduled")
    ) or 0
    completed_trips = db.scalar(
        select(func.count)
        .select_from(Trip)
        .where(Trip.status == "completed")
    ) or 0
    
    # information about incidents
    critical_incidents = db.scalar(
        select(func.count)
        .select_from(Incident)
        .where(Incident.severity == "critical", Incident.status == "open")
    ) or 0
    current_incidents = db.scalar(
        select(func.count)
        .select(Incident)
        .where(Incident.status == "open")
    ) or 0
    
    # information about vehicle maintenance history
    pending_maintenance = db.scalar(
        select(func.count)
        .select(Maintenance)
        .where(Maintenance.status == "pending")
    ) or 0
    
    return {
            "vehicles": total_vehicles,
            "active": active_vehicles,
            "inactive": inactive_vehicles,
            "maintenance": maintenance,
            "trips": {
                "active": active_trips,
                "scheduled": scheduled_trips,
                "completed": completed_trips
            },
            "incidents": {
                "open": current_incidents,
                "critical": critical_incidents
            },
            "maintenance": {
                "pending": pending_maintenance
            }
        }
    
def build_incident_context(db: Session, incident: Incident) -> dict:
    vehicle = None
    if incident.vehicle_id:
        vehicle = db.get(Vehicle, incident.vehicle_id)
        
    return {
        "incident": {
            "id": incident.id,
            "type": incident.incident_type,
            "severity": incident.severity,
            "description": incident.description,
            "status": incident.status,
            "created_at": incident.created_at.isoformat() if incident.created_at else None,
        },
        "vehicle": {
            "id": vehicle.id,
            "vehicle_number": vehicle.vehicle_number,
            "vehicle_type": vehicle.vehicle_type,
            "capacity": vehicle.capacity,
            "passenger_count": vehicle.passenger_count,
            "latitude": vehicle.latitude,
            "longitude": vehicle.longitude,
            "status": vehicle.status
        } if vehicle else None
    }