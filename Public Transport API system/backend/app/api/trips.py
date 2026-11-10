from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin, require_operator
from app.schemas import (
    TripResponse,
    TripCreate,
    TripActionResponse,
    TransportAnalysisRequest,
    TransportAnalysisResponse
)
from app.services import create_trip, get_trip, start_trip, complete_trip, get_vehicle, get_route
from app.models import User

router = APIRouter(prefix="/trips", tags=["Tags"])

@router.post("/", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
def create_new_trip(data: TripCreate, db: Session = Depends(get_db), current_admin: User = Depends(require_admin)):
    vehicle = get_vehicle(db, data.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    route = get_route(db, data.route_id)
    
    if not route:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Route not found.")
    new_trip = create_trip(
        db,
        data.vehicle_id,
        data.route_id,
        data.scheduled_start,
        data.scheduled_end
    )
    
    return new_trip

@router.get("/{trip_id}", response_model=TripResponse, status_code=status.HTTP_200_OK)
def read_trip(trip_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    trip = get_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found.")
    return trip

@router.post("/{trip_id}/start", response_model=TripActionResponse)
def begin_trip(trip_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    trip = start_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found.")
    return {
        "message": "Trip started successfully",
        "trip": trip
    }
    
@router.post("/{trip_id}/complete", response_model=TripActionResponse)
def finish_trip(trip_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    trip = complete_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found.")
    return {
        "message": "Trip completed successfully",
        "trip": trip
    }