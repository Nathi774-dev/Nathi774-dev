from datetime import datetime
from enum import Enum
from sqlalchemy import DateTime, ForeignKey, String, Text, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

class InterviewType(str, Enum):
    ONLINE = "online"
    PHONE = "phone"
    ONSITE = "onsite"
    TECHNICAL = "technical"
    HR = "hr"
    
class InterviewStatus(str, Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    
class Interview(Base):
    __tablename__ = "interviews"
    
    id: Mapped[int] = mapped_column(primary_key=True, nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    application_id: Mapped[int] = mapped_column(ForeignKey("applications.id"), nullable=False)
    interview_type: Mapped[InterviewType] = mapped_column(SQLEnum(InterviewType), nullable=False)
    interview_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    
    # The CRUD operations
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
    
    location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    
    application = relationship("Application", back_populates="interviews")