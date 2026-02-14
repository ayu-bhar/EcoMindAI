from typing import Dict
from fastapi import APIRouter, HTTPException, Body
from agents.base_agent import BaseAgent
from core.chat_request import ChatRequest
from core.uchatrequest import Uchatrequest
from core.chatresponse import ChatResponse
from pydantic import ValidationError

baseagent = BaseAgent()
router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post(
    "",
    response_model=ChatResponse,
    summary="Handle both ChatRequest and Uchatrequest automatically",
    description="Endpoint accepts either ChatRequest or Uchatrequest. Backend auto-detects type based on JSON fields."
)
def chat(request: Dict = Body(...)):
    """
    Automatically detect the request type without needing a 'type' field.
    Tries ChatRequest first, then Uchatrequest.
    """

    req_obj = None
    errors = []

    # Try ChatRequest
    try:
        req_obj = ChatRequest(**request)
    except ValidationError as e:
        errors.append(f"ChatRequest failed: {str(e)}")

    # If ChatRequest failed, try Uchatrequest
    if req_obj is None:
        try:
            req_obj = Uchatrequest(**request)
        except ValidationError as e:
            errors.append(f"Uchatrequest failed: {str(e)}")

    # If neither worked, raise 400
    if req_obj is None:
        raise HTTPException(
            status_code=400,
            detail=f"Could not parse request as either ChatRequest or Uchatrequest. Errors: {errors}"
        )

    # Pass to BaseAgent
    try:
        result = baseagent.handle_request(request=req_obj)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
