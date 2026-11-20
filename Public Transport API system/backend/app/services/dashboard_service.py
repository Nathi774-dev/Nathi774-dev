from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.models import Trip, Incident, Maintenance, Vehicle


def get_dashboard_overview(db: Session) -> dict:
    total_vehicles = db.scalar(select(func.count).select_from(Vehicle)) or 0
    
    active_vehicles = db.scalar(select(func.count).select_from(Vehicle).where(Vehicle.status == "active")) or 0
    
    inactive_vehicles = db.scalar(select(func.count).select_from(Vehicle).where(Vehicle.status == "inactive")) or 0
    
    maintenance_vehicles = db.scalar(select(func.count).select_from(Vehicle).where(Vehicle.status == "maintenance")) or 0
    
    active_trips = db.scalar(select(func.count).select_from(Trip).where(Trip.status == "in_progress"))
    
    scheduled_trips = db.scalar(select(func.count).select_from(Trip).where(Trip.status == "scheduled"))
    
    completed_trips = db.scalar(select(func.count).select_from(Trip).where(Trip.status == "completed"))
     
    open_incidents = db.scalar(select(func.count).select_from(Incident).where(Incident.status == "open"))
    
    resolved_incidents = db.scalar(select(func.count).select_from(Incident).where(Incident.status == "resolved"))
    
    pending_maintenance = db.scalar(select(func.count).select_from(Maintenance).where(Maintenance.status == "pending"))
    
    return {
        "vehicles": total_vehicles,
        "active": active_vehicles,
        "inactive": inactive_vehicles,
        "maintenance": maintenance_vehicles,
        "trips": {
            "active": active_trips,
            "scheduled": scheduled_trips,
            "completed": completed_trips
        },
        "incidents": {
            "open": open_incidents,
            "resolved": resolved_incidents
        },
        "maintenance": {
            "pending": pending_maintenance
        }
    }
    
# Live Updates
def get_live_vehicle_updates(db: Session, status: str | None = None, vehicle_number: str | None = None):
    query = select(Vehicle)
    if status:
        query = query.where(Vehicle.status == status)
    if vehicle_number:
        query = query.where(Vehicle.vehicle_number.ilike(f"%{vehicle_number}%"))
    return db.scalars(query.order_by(Vehicle.vehicle_number)).all()

def get_live_trips(db: Session, route_id: int | None = None, vehicle_id: int | None = None):
    query = select(Trip)
    if route_id:
        query = query.where(Trip.route_id == route_id)
    if vehicle_id:
        query = query.where(Trip.vehicle_id == vehicle_id)
        
    return db.scalars(
        query
        .where(Trip.status == "in_progress")
        .order_by(Trip.actual_start)).all()

def get_live_incidents(db: Session, vehicle_id: int | None = None, severity: str | None = None):
    query = select(Incident)
    if vehicle_id:
        query = query.where(Incident.vehicle_id == vehicle_id)
    if severity:
        query = query.where(Incident.severity == severity)
    return db.scalars(
        query
        .where(Incident.status == "open")
        .order_by(Incident.created_at.desc())
    ).all()

def pending_maintenances(db: Session, vehicle_id: int | None = None, task_type: str | None = None):
    query = select(Maintenance)
    if task_type:
        query = query.where(Trip.route_id == task_type)
    if vehicle_id:
        query = query.where(Trip.vehicle_id == vehicle_id)
    return db.scalars(
        query
        .where(Maintenance.status == "pending")
        .order_by(Maintenance.schedules_date)
    ).all()