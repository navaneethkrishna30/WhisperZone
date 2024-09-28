import pytest
import json
from flask import Flask, session
from flask_socketio import SocketIO
from app import app, redis, db

@pytest.fixture
def client():
    with app.test_client() as client:
        with app.app_context():
            # Clear Redis and MongoDB before each test
            redis.flushall()
            db.chats.delete_many({})
        yield client

@pytest.fixture
def create_room(client):
    """Helper fixture to create a room for testing."""
    response = client.post('/api/create-room', json={'name': 'TestUser'})
    data = response.get_json()
    return data['room']

def test_create_room(client):
    response = client.post('/api/create-room', json={'name': 'TestUser'})
    assert response.status_code == 200
    data = response.get_json()
    assert 'room' in data
    assert data['name'] == 'TestUser'

def test_create_room_missing_name(client):
    response = client.post('/api/create-room', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert data['error'] == "Name is required"

def test_join_room(client, create_room):
    response = client.post('/api/join-room', json={'name': 'TestUser2', 'code': create_room})
    assert response.status_code == 200
    data = response.get_json()
    assert data['room'] == create_room
    assert data['name'] == 'TestUser2'

def test_join_nonexistent_room(client):
    response = client.post('/api/join-room', json={'name': 'TestUser', 'code': 'NonExistentRoom'})
    assert response.status_code == 400
    data = response.get_json()
    assert data['error'] == "Room does not exist"

def test_save_chat(client, create_room):
    client.post('/api/join-room', json={'name': 'TestUser', 'code': create_room})

    redis.hset(f'room:{create_room}', 'messages', json.dumps([{'name': 'TestUser', 'message': 'Hello'}]))
    
    response = client.post('/api/save-chat', json={'room': create_room})
    assert response.status_code == 200
    data = response.get_json()
    assert data['message'] == 'Chat saved successfully'

def test_save_chat_missing_room(client):
    response = client.post('/api/save-chat', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert data['error'] == "Room ID is required"

def test_socketio_message(create_room):
    """Test sending a message through SocketIO."""
    # Create a SocketIO client
    socketio = SocketIO(app)
    client = socketio.test_client(app)
    
    # Join the room
    client.post('/api/join-room', json={'name': 'TestUser', 'code': create_room})
    
    # Emit a message through the WebSocket
    response = client.emit('message', {'data': 'Hello World'}, to=create_room)
    assert response is None  # Emit doesn't return a response


def test_websocket_connection(create_room):
    """Test WebSocket connection."""
    socketio = SocketIO(app)
    client = socketio.test_client(app)

    # Join the room
    client.post('/api/join-room', json={'name': 'TestUser', 'code': create_room})


    client.emit('message', {'data': 'Hello!'}, to=create_room)
    received = client.get_received()
    assert len(received) > 0
