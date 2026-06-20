from datetime import datetime
from enum import Enum
from sqlalchemy import DateTime, ForeignKey, String, Text, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

class InterviewType(str, Enum):
    PHONE = "phone"
    VIDEO = "video"
    TECHNICAL = "technical"
    HR = "hr"
    FINAL = "final"
    
class Interview(Base):
    __tablename__ = "interviews"
    
    id: Mapped[int] = mapped_column(primary_key=True, nullable=False, index=True)
    application_id: Mapped[int] = mapped_column(ForeignKey("applications.id"), nullable=False)
    interview_type: Mapped[InterviewType] = mapped_column(SQLEnum(InterviewType), nullable=False)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    
    application = relationship("Application", back_populates="interviews")