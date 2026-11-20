from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin, require_operator
from app.schemas import StopCreate, StopResponse
from app.services import create_stop, get_route_stops, get_stop
from app.services import get_route
from app.models import User

router = APIRouter(prefix="/stops", tags=["Stops"])

@router.post("/", response_model=StopResponse, status_code=status.HTTP_201_CREATED)
def create_new_stop(data: StopCreate, db: Session = Depends(get_db), current_admin: User = Depends(require_admin)):
    # We need a route to create a stop
    route = get_route(db, data.route_id)
    if not route:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Route is not found.")
    new_stop = create_stop(
        db,
        data.route_id,
        data.name,
        data.stop_order,
        data.latutide,
        data.longitude
    )
    
    return new_stop

@router.get("/{stop_id}", response_model=StopResponse, status_code=status.HTTP_200_OK)
def read_stop(stop_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    stop = get_stop(db, stop_id)
    if not stop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stop is not found.")
    return stop

@router.get("/routes/{route_id}", response_model=list[StopResponse], status_code=status.HTTP_200_OK)
def read_route_stops(route_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    route = get_route(db, route_id)
    if not route:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Route not found.")
    return get_route_stops(db, route_id)

