from pydantic import BaseModel
from typing import List

class Uchatrequest(BaseModel):
    electricity:int
    water:int
    householdSize:int
    renewable:int
    transportPoints:int
    wastePoints:int
    plasticPoints:int
    fuelPoints:int
    purchasePoints:int
    foodPoints:int
