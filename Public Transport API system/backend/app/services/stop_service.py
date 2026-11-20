from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.stop import Stop

def create_stop(
    db: Session,
    route_id: int,
    name: str,
    stop_order: int,
    latitude: float | None = None,
    longitude: float | None = None
) -> Stop:
    stop = Stop(
        route_id=route_id,
        name=name,
        stop_order=stop_order,
        latitude=latitude,
        longitude=longitude
    )
    
    db.add(stop)
    db.commit()
    db.refresh(stop)
    
    return stop

def get_stop(db: Session, stop_id: int) -> Stop | None:
    return db.get(Stop, stop_id)

def get_route_stops(db: Session, route_id: int) -> list[Stop]:
    stops = select(Stop).where(Stop.route_id == route_id).order_by(Stop.stop_order)
    return list(db.scalars(stops).all())