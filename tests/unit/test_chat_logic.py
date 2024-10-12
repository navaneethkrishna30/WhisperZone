import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

@pytest.fixture
def valid_room_data():
    return {'name': 'ValidRoom'}

def test_create_room_valid(client, valid_room_data):
    """Test creating a room with valid input."""
    response = client.post("/api/create-room", json=valid_room_data)
    assert response.status_code == 200
    assert 'room' in response.get_json()

def test_create_room_invalid(client):
    """Test creating a room with invalid input (empty name)."""
    response = client.post("/api/create-room", json={'name': ''})
    assert response.status_code == 404
    assert response.get_json()['error'] == "Name is required"

def test_save_chat_valid(client):
    """Test saving a chat with valid room."""
    mock_room_data = {'name': 'ValidRoom'}
    response = client.post("/api/create-room", json=mock_room_data)
    room_code = response.get_json()['room']

    # Simulate saving a chat
    save_chat_data = {'room': room_code}
    response = client.post("/api/save-chat", json=save_chat_data)
    assert response.status_code == 200
    assert response.get_json()['message'] == "Chat saved successfully"

def test_save_chat_invalid(client):
    """Test saving a chat with invalid room (non-existing room code)."""
    response = client.post("/api/save-chat", json={'room': 'invalid_code'})
    assert response.status_code == 404
    assert response.get_json()['error'] == 'Room does not exist'

def test_create_room_no_name(client):
    """Test creating a room with no name (invalid input)."""
    response = client.post('/api/create-room', json={'name': ''})
    assert response.status_code == 404
    assert response.get_json()['error'] == "Name is required"

def test_save_chat_missing_room_field(client):
    """Test saving a chat with missing 'room' field (invalid input)."""
    response = client.post('/api/save-chat', json={})
    assert response.status_code == 404
    assert response.get_json()['error'] == "Room ID is required"

def test_create_room_success(client):
    """Test creating a room with a valid name."""
    response = client.post('/api/create-room', json={'name': 'Test Room'})
    assert response.status_code == 200
    assert 'room' in response.get_json()
    assert 'name' in response.get_json()

def test_save_chat_success(client):
    """Test saving a chat with valid input."""
    # First, create a room
    room_response = client.post('/api/create-room', json={'name': 'Test Room'})
    room_id = room_response.get_json()['room']

    # Then, save a chat in that room
    response = client.post('/api/save-chat', json={'room': room_id})
    assert response.status_code == 200
    assert response.get_json()['message'] == "Chat saved successfully"

# new tests
def test_join_room_missing_name(client):
    """Test joining a room with a missing name."""
    response = client.post("/api/join-room", json={'name': '', 'code': 'test_code'})
    assert response.status_code == 404
    assert response.get_json()['error'] == 'Name is required'


def test_join_room_invalid_code(client):
    """Test joining a room that does not exist."""
    response = client.post("/api/join-room", json={'name': 'User', 'code': 'invalid_code'})
    assert response.status_code == 404
    assert response.get_json()['error'] == 'Room does not exist'

def test_create_room_error(client, monkeypatch):
    """Test the error handling when creating a room fails."""

    # Mocking the part of the create_room function that interacts with the database
    def mock_hset_failure(*args, **kwargs):
        raise Exception("Database error")

    monkeypatch.setattr('app.redis.hset', mock_hset_failure)

    response = client.post("/api/create-room", json={"name": "Test User"})
    assert response.status_code == 500
    assert response.get_json() == {"error": "Failed to create room: Database error"}


def test_save_chat_error(client, monkeypatch):
    """Test the error handling when saving a chat fails."""

    # Mocking the part of the save_chat function that interacts with the database
    def mock_insert_one_failure(*args, **kwargs):
        raise Exception("Database save error")

    monkeypatch.setattr('app.db.chats.insert_one', mock_insert_one_failure)

    response = client.post("/api/save-chat", json={"room": "test_room"})
    assert response.status_code == 404
    assert response.get_json() == {"error": "Room does not exist"}


