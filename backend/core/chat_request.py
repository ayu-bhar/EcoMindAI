from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    name: str
    location: str
    population: int
    communityType: str
    energySources: List[str]
    waterConsumption: str
    wasteManagement: str
    publicTransport: str
    renewableEnergyAccess: str
    recyclingFacilities: str
    priorities: List[str]
