import json
from core.llm import get_llm
from core.chat_request import ChatRequest
from core.uchatrequest import Uchatrequest
from core.chatresponse import ChatResponse  

class BaseAgent:

    def __init__(self):
        self.llm = get_llm()

    def handle_request(self, request) -> ChatResponse:
        try:
            # Determine type and safely access fields
            if isinstance(request, ChatRequest):
                data = request.dict()
                prompt = f"""
Community Name: {data.get('name', '')}
Location: {data.get('location', '')}
Population: {data.get('population', '')}
Type: {data.get('communityType', '')}

Energy Sources: {', '.join(data.get('energySources', []))}
Water Consumption: {data.get('waterConsumption', '')}
Waste Management: {data.get('wasteManagement', '')}
Public Transport: {data.get('publicTransport', '')}
Renewable Energy Access: {data.get('renewableEnergyAccess', '')}
Recycling Facilities: {data.get('recyclingFacilities', '')}

Community Priorities:
{', '.join(data.get('priorities', []))}

Provide sustainability improvement recommendations.

IMPORTANT:
- Return response STRICTLY in valid JSON.
- Follow EXACT structure below:

{{
  "summary": "string",
  "actionItems": [
    {{"name": "string","description": "string","timeline": "string","cost": "string","impact": "string"}}
  ],
  "expectedOutcomes": ["string"],
  "resourceRequirements": "string"
}}
"""
            elif isinstance(request, Uchatrequest):
                data = request.dict()
                query = data.get("query", "No query provided")
                preferences = data.get("preferences", [])

                prompt = f"""
User Query: {query}
User Preferences: {', '.join(preferences)}

Max points of parameters are:
Electricity Usage (15 pts),
Renewable Energy Usage (10 pts),
Water Consumption (10 pts),
Waste Segregation (10 pts),
LPG / Cooking Fuel Efficiency (5 pts),
Transport Method (15 pts),
Plastic Usage (10 pts),
Sustainable Purchasing (5 pts),
Food Waste (5 pts)

Provide recommendations in the EXACT ChatResponse format:
{{
  "summary": "string",
  "actionItems": [
    {{"name": "string","description": "string","timeline": "string","cost": "string","impact": "string"}}
  ],
  "expectedOutcomes": ["string"],
  "resourceRequirements": "string"
}}
"""
            else:
                raise ValueError("Unknown request type")

            # Call LLM
            response = self.llm.invoke(prompt)
            content = getattr(response, "content", response)
            content = content.strip().replace("```json", "").replace("```", "").strip()

            # Parse JSON safely
            try:
                parsed_json = json.loads(content)
            except json.JSONDecodeError:
                return {
                    "summary": "Failed to parse AI response.",
                    "actionItems": [],
                    "expectedOutcomes": [],
                    "resourceRequirements": "The AI returned invalid JSON."
                }

            # Ensure required fields exist
            return {
                "summary": parsed_json.get("summary", ""),
                "actionItems": parsed_json.get("actionItems", []),
                "expectedOutcomes": parsed_json.get("expectedOutcomes", []),
                "resourceRequirements": parsed_json.get("resourceRequirements", "")
            }

        except Exception as e:
            return {
                "summary": "System error occurred.",
                "actionItems": [],
                "expectedOutcomes": [],
                "resourceRequirements": str(e)
            }
