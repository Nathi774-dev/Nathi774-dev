from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Maintenance

def get_pending_maintenance(db: Session) -> list[Maintenance]:
    return db.scalars(
        select(Maintenance)
        .where(Maintenance.status == "pending")
        .order_by(Maintenance.schedules_date.desc()),
    ).all()
    
def get_overdue_maintenance(db: Session) -> list[Maintenance]:
    today = date.today()
    
    return db.scalars(
        select(Maintenance)
        .where(
            Maintenance.status == "pending", 
            Maintenance.schedules_date.is_not(None),
            Maintenance.schedules_date < today
        )
        .order_by(Maintenance.schedules_date.desc())
    ).all()