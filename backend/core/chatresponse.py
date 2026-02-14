from pydantic import BaseModel
from typing import List
from core.actionitems import ActionItem

class ChatResponse(BaseModel):
    summary: str
    actionItems: List[ActionItem]
    expectedOutcomes: List[str]
    resourceRequirements: str