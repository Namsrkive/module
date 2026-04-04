from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db.supabase_client import supabase

router = APIRouter(prefix="/tests", tags=["tests"])

class TestCreate(BaseModel):
    name: str
    duration: int
    test_type: str
    difficulty: str
    created_by: str  # uuid text

@router.post("/", summary="Create a test")
async def create_test(payload: TestCreate):
    result = supabase.table("tests").insert({
        "name": payload.name,
        "duration": payload.duration,
        "test_type": payload.test_type,
        "difficulty": payload.difficulty,
        "created_by": payload.created_by,
    }).execute()

    if getattr(result, "error", None):
        raise HTTPException(status_code=500, detail=str(result.error))

    return {"success": True, "data": result.data}