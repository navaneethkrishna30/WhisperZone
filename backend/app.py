from flask import Flask, request, session, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from string import ascii_uppercase
from flask_cors import CORS

app = Flask(__name__)
app.config["SECRET_KEY"] = "hjhjsdahhds"
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

rooms = {}

def generate_unique_code(length):
    while True:
        code = "".join(random.choice(ascii_uppercase) for _ in range(length))
        if code not in rooms:
            break
    return code

@app.route("/api/create-room", methods=["POST"])
def create_room():
    name = request.json.get("name")
    if not name:
        return jsonify({"error": "Name is required"}), 400

    room_code = generate_unique_code(4)
    rooms[room_code] = {"members": {}, "messages": []}
    session["room"] = room_code
    session["name"] = name
    return jsonify({"room": room_code, "name": name})

@app.route("/api/join-room", methods=["POST"])
def join_room_api():
    name = request.json.get("name")
    code = request.json.get("code")

    if not name:
        return jsonify({"error": "Name is required"}), 400
    if not code or code not in rooms:
        return jsonify({"error": "Room does not exist"}), 400

    session["room"] = code
    session["name"] = name
    return jsonify({"room": code, "name": name})

@socketio.on("message")
def handle_message(data):
    room = session.get("room")
    if room not in rooms:
        return

    content = {
        "name": session.get("name"),
        "message": data["data"]
    }
    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')} said: {data['data']}")

@socketio.on("connect")
def handle_connect():
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        return
    
    join_room(room)
    rooms[room]["members"][name] = True

    # Notify room about new user
    send({"name": name, "message": "has entered the room"}, to=room)
    
    # Send list of connected users to the newly connected user
    send({"members": list(rooms[room]["members"].keys())}, to=request.sid)

    # Emit the updated list of members to all users in the room
    socketio.emit('members', {"members": list(rooms[room]["members"].keys())}, to=room)

    # Emit previous messages to the newly connected user
    socketio.emit('previous-messages', {"messages": rooms[room]["messages"]}, to=request.sid)

    print(f"{name} joined room {room}")


@socketio.on("disconnect")
def handle_disconnect():
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        return
    
    # Remove the user from the room's member list
    if name in rooms[room]["members"]:
        del rooms[room]["members"][name]

        # Notify room about the user leaving
        socketio.emit('members', {"members": list(rooms[room]["members"].keys())}, to=room)
        send({"name": name, "message": "has left the room"}, to=room)

    print(f"{name} left room {room}")


if __name__ == "__main__":
    socketio.run(app, debug=True)
