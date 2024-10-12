import pytest
from app import app  # Import the Flask app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_create_room_no_name(client):
    """Test creating a room with no name (invalid input)."""
    response = client.post('/api/create-room', json={'name': ''})  # Simulate POST request
    assert response.status_code == 404
    assert response.get_json()['error'] == 'Name is required'  # Adjust error message

def test_save_chat_missing_room_field(client):
    """Test saving a chat with missing 'room' field (invalid input)."""
    response = client.post('/api/save-chat', json={})  # Simulate POST request
    assert response.status_code == 404
    assert response.get_json()['error'] == 'Room ID is required'  # Adjust error message
