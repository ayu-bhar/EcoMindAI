from pydantic import BaseModel

class ActionItem(BaseModel):
    name: str
    description: str
    timeline: str
    cost: str
    impact: str
