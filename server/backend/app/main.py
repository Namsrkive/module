from fastapi import FastAPI, HTTPException
from app.db.supabase_client import supabase
from app.routes.test_routes import router as test_router

print("MAIN LOADED")

app = FastAPI(title="Supabase Backend API")

app.include_router(test_router)

@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.get("/test-db")
def test_db_connection():
    try:
        response = supabase.table("users").select("*").limit(1).execute()
        return {
            "status": "success",
            "message": "Connected to Supabase successfully.",
            "data": response.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))