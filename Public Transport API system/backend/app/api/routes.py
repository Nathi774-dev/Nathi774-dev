from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin, require_operator
from app.schemas import RouteCreate, RouteResponse, RouteUpdate
from app.services import (
    create_route, get_route, get_route_by_number, get_all_routes
)
from app.models import User

router = APIRouter(prefix="/routes", tags=["Routes"])

@router.post("/", response_model=RouteResponse, status_code=status.HTTP_201_CREATED)
def create_new_route(data: RouteCreate, db: Session = Depends(get_db), current_admin: User = Depends(require_admin)):
    existing_route = get_route_by_number(db, data.route_number)
    if existing_route:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Route already exists.")
    new_route = create_route(
        db, data.name, data.route_number, data.start_location, data.end_location, data.status
    )
    return new_route

@router.get("/", response_model=list[RouteResponse], status_code=status.HTTP_200_OK)
def get_routes(db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    routes = get_all_routes(db)
    return routes

@router.get("/{route_id}", response_model=RouteResponse, status_code=status.HTTP_200_OK)
def read_route(route_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    route = get_route(db, route_id)
    if not route:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Route is not found.")
    return route