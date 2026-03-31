import json
from typing import Optional
from kafka import KafkaProducer, KafkaConsumer
from app.core.config import get_settings

settings = get_settings()

class KafkaService:
    def __init__(self):
        self.producer: Optional[KafkaProducer] = None
        self.broker = getattr(settings, "KAFKA_BROKER", "localhost:9092")

    def get_producer(self) -> KafkaProducer:
        if self.producer is None:
            self.producer = KafkaProducer(
                bootstrap_servers=self.broker,
                value_serializer=lambda v: json.dumps(v).encode("utf-8"),
            )
        return self.producer

    def publish_event(self, topic: str, event: dict):
        producer = self.get_producer()
        producer.send(topic, value=event)
        producer.flush()

    def consume_events(self, topic: str, group_id: str = "learnflow"):
        consumer = KafkaConsumer(
            topic,
            bootstrap_servers=self.broker,
            group_id=group_id,
            value_deserializer=lambda m: json.loads(m.decode("utf-8")),
            auto_offset_reset="earliest",
        )
        return consumer

kafka_service = KafkaService()

TOPICS = {
    "learning": "learning.events",
    "code": "code.events",
    "exercise": "exercise.events",
    "struggle": "struggle.events",
}
