from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.interview import Interview
from app.models.application import Application

class ReminderService:
     @staticmethod
     def get_reminders(db: Session, user_id: int):
        now = datetime.utcnow()
        next_week = now + timedelta(days=7)
        
        interviews = db.query(Interview).join(Application, Interview.application_id == Application.id).filter(
            Application.user_id == user_id,
            Interview.interview_date >= now,
            Interview.interview_date <= next_week
        ).all()
        
        reminders = []
        for interview in interviews:
            reminders.append({
                'type': 'interview',
                'title': interview.title,
                'reminder_date': interview.interview_date,
                'message': f'Interview for {interview.application.company_name}'
            });
        return reminders