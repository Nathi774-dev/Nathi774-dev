from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class StoryOptionLLM(BaseModel):
    text: str = Field(description="the text of the option shown to the user")
    nextNode: Dict[str, Any] = Field(description="the next node content and its options")
    
class StoryNodeLLM(BaseModel):
    content: str = Field(description="The main content of the story node")
    is_ending: bool = Field(description="Whether this node is an ending node")
    is_winning_ending: bool = Field(description="Whether this node is a winning node")
    options: Optional[List[StoryOptionLLM]] = Field(default=None, description="The options for this node")
    
class StoryLLMResponse(BaseModel):
    title: str = Field(description="The title of the story")
    root_node: StoryNodeLLM = Field(description="The root of the story")