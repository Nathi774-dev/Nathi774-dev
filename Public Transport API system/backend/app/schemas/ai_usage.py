from datetime import datetime
from pydantic import BaseModel, Field

class AIRequest(BaseModel):
    prompt: str = Field(min_length=6, max_length=3000)
    model_name: str | None = None
    
class AIResponse(BaseModel):
    incident_id: int
    response: str
    model_name: str
    input_tokens: int
    output_tokens: int
    estimated_cost: float
    
class AIUsageResponse(BaseModel):
    id: int
    user_id: int | None
    model_name: str
    input_tokens: int
    output_tokens: int
    estimated_cost: float
    created_at: datetime
    
    model_config = {"from_attributes": True}
    
class TransportAnalysisRequest(BaseModel):
    question: str = Field(min_length=1, max_length=3000)
    
class TransportAnalysisResponse(BaseModel):
    analysis: str
    model_name: str
    estimated_cost: float
    
# This is for all admin endpoints 
# Starting with the billing requests and responses
class AIBillingSummaryAndResponse(BaseModel):
    total_requests: int
    total_input_tokens: int
    total_output_tokens: int
    total_tokens: int
    total_estimated_cost: float
    
class AIModelUsageResponse(BaseModel):
    model_name: str
    requests: int
    input_tokens: int
    output_tokens: int
    total_tokens: int
    estimated_cost: float
    
class AIBillingUsageResponse(BaseModel):
    id: int
    user_id: int |  None
    model_name: str
    input_tokens: int
    output_tokens: int
    total_tokens: int
    estimated_cost: float
    created_at: datetime