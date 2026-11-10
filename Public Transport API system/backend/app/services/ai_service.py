from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.ai import (
    build_transport_context, 
    ask_llm, 
    SYSTEM_PROMPT, 
    build_analysis_prompt,
    build_incident_context,
    analyze_incident
)
from app.models import AIUsage, Incident

DEFAULT_MODEL = "gpt-5.6-luna"

MODEL_PRICING = {
    "gpt-5.6-luna": {
        "input": 0.20,
        "output": 1.20
    }
}

def calculate_cost(model_name: str, input_tokens: int, output_tokens: int) -> float:
    pricing = MODEL_PRICING.get(model_name)
    if not pricing:
        return 0.0
    input_cost = (input_tokens / 1_000_000) * pricing["input"]
    output_tokens = (output_tokens / 1_000_000) * pricing["output"]
    
    return round(input_tokens + output_tokens, 8)

async def analyze_transport(db: Session, user_id: int, prompt: str, model_name: str | None = None) -> dict:
    selected_model = model_name or DEFAULT_MODEL
    
    # model validation to prevent unexpected purchases
    if selected_model not in MODEL_PRICING:
        raise ValueError("The AI model isn't supported")
    
    transport_context = build_transport_context(db)
    analyse_prompt = build_analysis_prompt(prompt, transport_context)
    # ask the LLM
    result = await ask_llm(analyse_prompt, SYSTEM_PROMPT, selected_model)
    
    # extract the usage tokens
    input_tokens = result.get("input_tokens", 0)
    output_tokens = result.get("output_tokens", 0)
    
    # Calculate the cost
    estimated_cost = calculate_cost(selected_model, input_tokens, output_tokens)
    
    # record the usage
    usage = AIUsage(
        user_id=user_id, 
        model_name=selected_model, 
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        estimated_cost=estimated_cost,
        created_at=datetime.now(timezone.utc)
    )
    
    db.add(usage)
    db.commit()
    db.refresh(usage)
    
    return {
        "analysis": result["analysis"],
        "model_name": selected_model,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "estimated_cost": estimated_cost,
        "created_at": usage.created_at
    }
    
async def analyze_transport_incident(db: Session, incident_id: int) -> str:
    incident = db.get(Incident, incident_id)
    if not incident:
        raise ValueError("Incident does not exist or has not been registered")
    
    context = build_incident_context(db, incident)
    analysis = await analyze_incident(context)
    return analysis