from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Incident

def get_open_incidents(db: Session) -> list[Incident]:
    return db.scalars(
        select(Incident)
        .where(Incident.status == "open")
        .order_by(Incident.created_at.desc())
    ).all()
    
def get_critical_incidents(db: Session) -> list[Incident]:
    return db.scalars(
        select(Incident)
        .where(Incident.status == "open", Incident.severity == "critical")
        .order_by(Incident.created_at.desc())
    ).all()