from app.ai.analysis import build_analysis_prompt
from app.ai.system import SYSTEM_PROMPT
from app.ai.context import build_transport_context, build_incident_context
from app.ai.llm_service import ask_llm, analyze_incident