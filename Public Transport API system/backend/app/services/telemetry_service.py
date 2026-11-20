from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Vehicle, VehicleTelemetry

def update_vehicle_telemetry(
    db: Session,
    vehicle_id: int,
    passenger_count: int | None = None,
    current_speed: float | None = None,
    latitude: float | None = None,
    longitude: float | None = None,
    status: str | None = None
) -> Vehicle | None:
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        return None
    
    if passenger_count is not None:
        vehicle.passenger_count = passenger_count
    if current_speed is not None:
        vehicle.current_speed = current_speed
    if latitude is not None:
        vehicle.latitude = latitude
    if longitude is not None:
        vehicle.longitude = longitude
    if status is not None:
        vehicle.status = status
        
    vehicle.last_seen = datetime.utcnow()
    add_to_vehicle_telemetry_history(db, vehicle)
    db.commit()
    db.refresh(vehicle)
    
    return vehicle

def add_to_vehicle_telemetry_history(db: Session, vehicle: Vehicle) -> VehicleTelemetry:
    telemetry = VehicleTelemetry(
        vehicle_id=vehicle.id,
        passenger_count=vehicle.passenger_count,
        current_speed=vehicle.current_speed,
        latitude=vehicle.latitude,
        longitude=vehicle.longitude,
        status=vehicle.status,
        created_at=datetime.now(timezone.utc)
    )
    
    db.add(telemetry)
    db.commit()
    db.refresh(telemetry)
    
    return telemetry

def get_vehicle_telemetry_history(
    db: Session, 
    vehicle_id: int, 
    limit: int = 100
) -> list[VehicleTelemetry]:
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        return []
    
    statement = (
        select(VehicleTelemetry)
        .where(VehicleTelemetry.vehicle_id == vehicle_id)
        .order_by(VehicleTelemetry.created_at.desc())
        .limit(limit)
    )
    
    return list(db.scalars(statement).all())