from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.models import AIUsage

def get_billing_summary(db: Session) -> dict:
    total_requests = db.scalar(select(func.count()).select_from(AIUsage)) or 0
    total_input_tokens = db.scalar(func.coalesce(func.sum(AIUsage.input_tokens), 0)) or 0
    total_output_tokens = db.scalar(func.coalesce(func.sum(AIUsage.output_tokens), 0)) or 0
    total_estimated_cost = db.scalar(func.coalesce(func.sum(AIUsage.estimated_cost), 0)) or 0
    
    total_tokens = total_input_tokens + total_output_tokens
    
    return {
        "total_requests": total_requests,
        "total_input_tokens": total_input_tokens,
        "total_output_tokens": total_output_tokens,
        "total_estimated_cost": total_estimated_cost,
        "total_tokens": float(total_tokens)
    }
    
def get_billing_usage(db: Session, limit: int = 100, offset: int = 0):
    return db.scalars(
        select(AIUsage)
        .order_by(AIUsage.created_at.desc())
        .offset(offset)
        .limit(limit)
    ).all()
    
def get_usage_by_model(db: Session) -> list[dict]:
    results = db.execute(
        select(
            AIUsage.model_name,
            func.count(AIUsage.id).label("requests"),
            func.coalesce(func.sum(AIUsage.input_tokens), 0).label("input_tokens"),
            func.coalesce(func.sum(AIUsage.output_tokens), 0).label("output_tokens"),
            func.coalesce(func.sum(AIUsage.estimated_cost), 0).label("estimated_cost")
        ).group_by(AIUsage.model_name).order_by(func.sum(AIUsage.estimated_cost).desc())
    ).all()
    
    usage = []
    
    for row in results:
        input_tokens = int(row.input_tokens or 0)
        output_tokens = int(row.output_tokens or 0)
        
        usage.append({
            "model_name": row.model_name,
            "requests": int(row.requests or 0),
            "input_tokens": int(row.input_tokens or 0),
            "output_tokens": int(row.output_tokens or 0),
            "total_tokens": (input_tokens + output_tokens),
            "estimated_cost": float(row.estimated_cost or 0)
        })
        
    return usage