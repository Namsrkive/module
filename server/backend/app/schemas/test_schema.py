from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TestCreate(BaseModel):
    name: str
    duration: int
    test_type: str
    difficulty: str
    created_by: Optional[UUID] = None