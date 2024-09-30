import pytest
import time
from app import redis, db
from app import app as flask_app

@pytest.fixture(scope="session")
def wait_for_services():
    """Ensure that Redis and MongoDB containers are ready before running tests."""
    # Wait for Redis
    for _ in range(10):
        try:
            if redis.ping():
                break
        except Exception:
            time.sleep(1)
    else:
        pytest.fail("Redis container is not ready")
    
    # Wait for MongoDB
    for _ in range(10):
        try:
            if db.command("ping"):
                break
        except Exception:
            time.sleep(1)
    else:
        pytest.fail("MongoDB container is not ready")

@pytest.fixture
def app():
    """Fixture to return the Flask app for testing."""
    yield flask_app

@pytest.mark.usefixtures("wait_for_services")
def test_redis_connection():
    """Test that Redis is running and can set and get a key."""
    # Set a key in Redis
    redis.set('test_key', 'test_value')
    
    # Retrieve the key
    value = redis.get('test_key')
    
    # Decode the byte string if necessary
    assert value== 'test_value', "Redis failed to store/retrieve key"

@pytest.mark.usefixtures("wait_for_services")
def test_mongodb_connection():
    """Test that MongoDB is running and can insert and retrieve a document."""
    # Insert a document into MongoDB
    test_data = {"name": "test_user", "message": "Hello World"}
    result = db.chats.insert_one(test_data)
    
    # Retrieve the document
    retrieved_data = db.chats.find_one({"_id": result.inserted_id})
    
    assert retrieved_data is not None, "MongoDB failed to insert/retrieve document"
    assert retrieved_data['name'] == "test_user", "MongoDB document field mismatch"

def test_backend_redis_mongo_integration(client):
    # Step 1: Create a room via the backend
    response = client.post('/api/create-room', json={'name': 'TestUser'})
    assert response.status_code == 200
    data = response.get_json()
    room_code = data['room']
    
    # Step 2: Store a message in Redis (Simulate chat)
    redis.hset(f'room:{room_code}', 'messages', '[{"name": "TestUser", "message": "Hello"}]')
    
    # Step 3: Save the chat to MongoDB (ensure this is the only place Mongo is called)
    response = client.post('/api/save-chat', json={'room': room_code})
    assert response.status_code == 200

    # Step 4: Verify that MongoDB contains the saved chat history
    chat_in_mongo = db.chats.find_one({"room_id": room_code})
    assert chat_in_mongo is not None, "MongoDB failed to store chat"
    assert chat_in_mongo["messages"] == [{"name": "TestUser", "message": "Hello"}]
