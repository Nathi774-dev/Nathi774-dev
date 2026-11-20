from app.ai import SYSTEM_PROMPT
from app.core import settings
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=settings.llm_api_key)

async def ask_llm(prompt: str, system_prompt: str, model_name: str) -> dict:
    response = await client.responses.create(
        model=model_name, 
        instructions=system_prompt, 
        input=prompt
    )
    
    usage = response.usage
    
    input_tokens = usage.input_tokens if usage else 0
    output_tokens = usage.output_tokens if usage else 0
    
    return {
        "analysis": response.output_text,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens
    }
    
async def analyze_incident(context: dict) -> str:
    # This API response is for development purposes
    if settings.ai_mode == "mock":
        incident = context["incident"]
        vehicle = context.get("vehicle")
        vehicle_number = vehicle['vehicle_number'] if vehicle else "Unknown vehicle"
        
        analysis = (
            f"[MOCK AI RESPONSE]\n\n"
            f"Incident: {incident['type']}\n"
            f"Severity: {incident['severity']}\n"
            f"Vehicle Number: {vehicle_number}\n"
            "Assessment:\n"
            f"{incident['description']}\n\n"
            "The recommeded action is to do investigation and research"
        )
        
        return {
            "response": analysis,
            "model_name": "mock-ai",
            "input_tokens": 0,
            "output_tokens": 0,
            "estimated_cost": 0.0
        }
    
    # Real OpenAI API response
    response = await client.responses.create(
        model=settings.llm_model,
        instructions=SYSTEM_PROMPT,
        input=[
            {
                "role": "user",
                "content": (
                    "Analyze the following transport incident:\n\n"
                    f"{context}"
                )
            }
        ]
        
    )
    
    input_tokens = getattr(response.usage, "input_tokens", 0)
    output_tokens = getattr(response.usage, "output_tokens", 0)
    
    return {
        "response": response.output_text,
        "model_name": response.llm_name,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "estimated_cost": 0
    }