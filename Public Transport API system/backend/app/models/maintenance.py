from sqlalchemy import INTEGER, ForeignKey, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
from datetime import datetime

class Maintenance(Base):
    __tablename__ = "maintenance"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicles.id"))
    maintenance_type: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    mileage: Mapped[int | None] = mapped_column(INTEGER, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="pending", nullable=False)
    schedules_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    