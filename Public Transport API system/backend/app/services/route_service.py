from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.route import Route

def create_route(
    db: Session,
    name: str,
    route_number: str,
    start_location: str,
    end_location: str,
    status: str
) -> Route:
    route = Route(
        name=name,
        route_number=route_number,
        start_location=start_location,
        end_location=end_location,
        status=status
    )
    
    db.add(route)
    db.commit()
    db.refresh(route)
    
    return route

def  get_route(db: Session, route_id: int) -> Route | None:
    return db.get(Route, route_id)

def get_route_by_number(db: Session, route_number: str) -> Route | None:
    statement = select(Route).where(Route.route_number == route_number)
    return db.scalar(statement)
    
def get_all_routes(db: Session) -> list[Route]:
    routes = select(Route).order_by(Route.route_number)
    return list(db.scalars(routes).all())