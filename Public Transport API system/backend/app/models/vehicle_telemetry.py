from datetime import datetime
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models import Base

class VehicleTelemetry(Base):
    __tablename__ = "vehicle_telemetry"
    
    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicles.id"), nullable=False)
    passenger_count: Mapped[int] = mapped_column(nullable=False)
    latitude: Mapped[float | None] = mapped_column(nullable=True)
    longitude: Mapped[float | None] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(nullable=False)
    current_speed: Mapped[float] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    
    vehicle = relationship("Vehicle")
    