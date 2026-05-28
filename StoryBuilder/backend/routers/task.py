import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session

from ..db.database import get_db
from ..models.task import StoryTask
from ..schemas.task import StoryTaskResponse


router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.get("/{task_id}", response_model=StoryTaskResponse)
def get_task_status(task_id: str, db: Session = Depends(get_db)):
    task = db.query(StoryTask).filter(StoryTask.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task