from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Vehicle

def create_vehicle(
    db: Session,
    vehicle_number: str,
    vehicle_type: str,
    capacity: int
) -> Vehicle:
    vehicle = Vehicle(
        vehicle_number=vehicle_number, 
        vehicle_type=vehicle_type,
        capacity=capacity,
        status="inactive"
    )
    
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    
    
    return vehicle
    
def get_vehicle(db: Session, vehicle_id: int) -> Vehicle | None:
    return db.get(Vehicle, vehicle_id)

def get_vehicle_by_number(db: Session, vehicle_number: str) -> Vehicle | None:
    statement = select(Vehicle).where(Vehicle.vehicle_number == vehicle_number)
    return db.scalars(statement).first()

def get_all_vehicles(db: Session) -> list[Vehicle]:
    statement = select(Vehicle)
    return list(db.scalars(statement.order_by(Vehicle.vehicle_number)).all())