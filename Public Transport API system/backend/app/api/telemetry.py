from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core import get_db, authenticate_device
from app.schemas import VehicleTelemetryRequest, VehicleTelemetryResponse
from app.services import update_vehicle_telemetry


router = APIRouter(tags=["Device Connections"], prefix="/telemetry")

router.post("/vehicles/{vehicle_id}", response_model=VehicleTelemetryResponse)
def recieve_vehicle_telemetry(
    vehicle_id: int,
    telemetry: VehicleTelemetryRequest,
    db: Session = Depends(get_db),
    _: bool = Depends(authenticate_device)
):
    try:
        vehicle = update_vehicle_telemetry(
            db,
            vehicle_id,
            telemetry.passenger_count,
            telemetry.current_speed,
            telemetry.latitude,
            telemetry.longitude,
            telemetry.status
        )
        return vehicle
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))