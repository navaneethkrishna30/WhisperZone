Here's a beautified and interactive documentation for **WhisperZone**, complete with tables, emojis, and an engaging layout:

---

# 🗨️ WhisperZone

A real-time chat application using Flask, Redis, MongoDB, Flask-SocketIO, and a React frontend powered by Vite. This application supports room-based chats with Redis for in-memory message storage and MongoDB for persistent chat history.

This project began as a demo for practicing DevOps and has now been made public for Hacktoberfest. Contributions and feature suggestions are welcome! 🎉

**(Hacktoberfest)**  
I’m open to new feature ideas! If you have any cool features you'd like to implement, open an issue, and I'll assign it to you so you can start working on it. 🛠️

## 🚀 Features

| Feature                          | Description                                                              |
|----------------------------------|--------------------------------------------------------------------------|
| **Real-time communication**      | Using WebSockets via Flask-SocketIO for instant messaging.               |
| **Room-based chat system**       | Supports dynamically generated room codes for private chats.            |
| **In-memory chat storage**       | Utilizes Redis for fast message storage.                               |
| **Persistent chat history**      | Chat history is saved in MongoDB for long-term access.                  |
| **REST API endpoints**           | Endpoints to create and join chat rooms, and save chat history.         |
| **User-friendly frontend**       | Built with React for an intuitive chat experience.                      |
| **Dockerized setup**             | Complete environment with Redis, MongoDB, Flask backend, and React frontend in containers. |
| **Integration tests**            | Tests for Redis, MongoDB connectivity, and API functionality.           |

## 📋 Prerequisites

Ensure you have the following installed:

| Tool                       | Link                                           |
|----------------------------|------------------------------------------------|
| **Docker**                 | [Install Docker](https://docs.docker.com/get-docker/) |
| **Docker Compose**         | [Install Docker Compose](https://docs.docker.com/compose/install/) |
| **Node.js**                | [Download Node.js](https://nodejs.org/)      |
| **Python**                 | Version 3.12.3 (for local backend development and testing) |

## 🌟 Getting Started

### Clone the Repository

```bash
git clone https://github.com/navaneethkrishna30/WhisperZone.git
cd WhisperZone
```

### Setup Docker Secrets

Create a `.env` file in the project root and define the following secrets:

```plaintext
REDIS_PASSWORD=your_redis_password
MONGO_INITDB_ROOT_USERNAME=your_mongo_username
MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
```

## 🐳 Running the Application with Docker

### Backend Services

This project uses Docker Compose to manage services (backend, Redis, MongoDB).

1. **Build and start the services:**

   ```bash
   docker-compose up --build
   ```

   This will start the backend, Redis, and MongoDB in their respective containers. The backend will be exposed on port `5000`.

2. **Access the application:**

   - The backend API will be available at [http://localhost:5000](http://localhost:5000).

### Frontend Development

The frontend is built using Vite and React, located in the `frontend/` directory.

To run the frontend locally (without Docker), follow these steps:

1. Navigate to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will now be available at [http://localhost:3000](http://localhost:3000). 🎨

## 🧪 Running Tests

The application includes integration tests for Redis, MongoDB, and API routes. To run the tests:

1. **Ensure Docker secrets are set for testing** (e.g., `REDIS_PASSWORD`, `MONGO_USER`, `MONGO_PASSWORD`).

2. **Run the tests:**

   ```bash
   docker-compose -f compose-test.yaml up --build --abort-on-container-exit
   ```

   This will start the backend in test mode and automatically run the tests.

## 🔧 Docker Services

The application is divided into the following services:

| Service   | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| **Backend**  | Flask app with WebSocket support via Flask-SocketIO for managing chat rooms and messages. |
| **Redis**    | In-memory message storage and room management for real-time performance.     |
| **MongoDB**  | Persistent chat history storage for long-term data access.                  |

## 🤝 Contributing

We welcome contributions from the community. To get started:

1. **Fork the repository.**
2. **Create a feature branch:**

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Make your changes.**
4. **Run tests locally.**
5. **Push the changes to your fork.**
6. **Submit a pull request.**

## 🛠️ Local Backend Development

For local backend development without Docker, follow these steps:

1. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set environment variables for Redis and MongoDB:

   ```bash
   export REDIS_PASSWORD=your_redis_password
   export MONGO_INITDB_ROOT_USERNAME=your_mongo_username
   export MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
   ```

4. Start the Flask app:

   ```bash
   flask run
   ```

   The backend will now run locally at [http://localhost:5000](http://localhost:5000). 🌐

## 🐞 Reporting Issues

If you encounter any bugs or have suggestions for improvements, please open an issue on GitHub. We appreciate your feedback! 💬

---

This documentation provides a clear, engaging overview of the WhisperZone application, making it easy for users and contributors to understand how to get started, use, and contribute to the project.
