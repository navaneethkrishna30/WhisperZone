import pytest
from app import db

def test_mongo_insert_find():
    """Test inserting and finding a document in MongoDB."""
    test_data = {"name": "TestUser", "message": "Hello"}
    result = db.chats.insert_one(test_data)
    retrieved = db.chats.find_one({"_id": result.inserted_id})
    assert retrieved['name'] == "TestUser"

def test_mongo_invalid_find():
    """Test finding a non-existing document."""
    retrieved = db.chats.find_one({"name": "NonExistentUser"})
    assert retrieved is None
