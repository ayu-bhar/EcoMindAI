from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

class GeminiLLM:
    def __init__(self):
        # The new SDK defaults to the stable v1 API
        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

    def invoke(self, prompt: str):
        # UPDATE: Changed model to 'gemini-2.0-flash' (or use 'gemini-2.5-flash')
        response = self.client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config={  
                "response_mime_type": "application/json",
                "temperature": 0.7,
                "max_output_tokens": 2048
            }
        )

        return response.text