import httpx
from typing import Optional
from app.core.config import get_settings

settings = get_settings()

class DaprService:
    def __init__(self):
        self.http_port = getattr(settings, "DAPR_HTTP_PORT", 3500)
        self.base_url = f"http://localhost:{self.http_port}"

    async def publish_event(self, pubsub_name: str, topic: str, data: dict):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v1.0/publish/{pubsub_name}/{topic}",
                json=data,
            )
            return response.status_code == 204

    async def invoke_service(self, app_id: str, method: str, data: dict, http_verb: str = "POST"):
        async with httpx.AsyncClient() as client:
            response = await client.request(
                http_verb,
                f"{self.base_url}/v1.0/invoke/{app_id}/method/{method}",
                json=data,
            )
            return response.json()

    async def save_state(self, store_name: str, key: str, value: dict):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v1.0/state/{store_name}",
                json=[{"key": key, "value": value}],
            )
            return response.status_code == 204

    async def get_state(self, store_name: str, key: str):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/v1.0/state/{store_name}/{key}",
            )
            return response.json()

dapr_service = DaprService()
