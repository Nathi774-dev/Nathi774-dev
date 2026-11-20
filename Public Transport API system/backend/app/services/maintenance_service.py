from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.maintenance import Maintenance

def create_maintenance_task(
    db: Session,
    vehicle_id: int | None = None,
    maintenance_type: str | None = None,
    description: str | None = None,
    mileage: int | None = None
) -> Maintenance:
    maintenance = Maintenance(
        vehicle_id=vehicle_id,
        maintenance_type=maintenance_type,
        description=description,
        mileage=mileage
    )
    
    db.add(maintenance)
    db.commit()
    db.refresh(maintenance)
    
    return maintenance

def get_vehicle_maintenance(db: Session, vehicle_id: int) -> list[Maintenance]:
    maintenances = select(Maintenance).where(Maintenance.vehicle_id == vehicle_id)
    return list(db.scalars(maintenances).all())

def complete_maintenance(db: Session, maintenance_id: int) -> Maintenance | None:
    maintenance = db.get(Maintenance, maintenance_id)
    
    if not maintenance:
        return None
    
    maintenance.status = "completed"
    db.commit()
    db.refresh(maintenance)
    
def get_pending_tasks(db: Session):
    pending_tasks = select(Maintenance).where(Maintenance.status == "pending")
    return list(db.scalars(pending_tasks).all())

def get_maintenance_task(db: Session, maintenance_id: int) -> Maintenance | None:
    task = select(Maintenance).where(Maintenance.id == maintenance_id)
    return db.scalar(task)