from app.db.supabase_client import supabase

def create_test(data: dict):
    try:
        response = supabase.table("tests").insert(data).execute()
        return response.data
    except Exception as e:
        raise Exception(f"Error creating test: {str(e)}")