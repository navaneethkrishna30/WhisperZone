<div align="center">

# `WhisperZone`

<i>A real-time chat application using Flask, Redis, MongoDB, Flask-SocketIO, and a React frontend powered by Vite. This application supports room-based chats with Redis for in-memory message storage and MongoDB for persistent chat history. This project began as a demo for practicing DevOps and has now been made public for Hacktoberfest. Contributions and feature suggestions are welcome!
</i>

</div>

<div align = "center">
<br>

<table align="center">
    <thead align="center">
        <tr border: 1px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
            <td><b>🛠️ Languages</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/navaneethkrishna30/WhisperZone?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/navaneethkrishna30/WhisperZone?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/navaneethkrishna30/WhisperZone?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/navaneethkrishna30/WhisperZone?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/navaneethkrishna30/WhisperZone?style=flat&color=critical&logo=github"/></td>
           <td><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/navaneethkrishna30/WhisperZone?style=flat&color=critical&logo=github"></td>
        </tr>
    </tbody>
</table>
</div>
<br>

**(Hacktoberfest)**
I'm open to new feature ideas! If you have any cool features you'd like to implement, open an issue, and I'll assign it to you so you can start working on it.

## Features

- **Real-time communication** using WebSockets via Flask-SocketIO.
- **Room-based chat system** with dynamically generated room codes.
- **In-memory chat storage** using Redis and **persistent chat history** saved in MongoDB.
- **REST API endpoints** to create and join chat rooms, and save chat history.
- **React frontend** for user-friendly chat experience.
- **Dockerized setup** with Redis, MongoDB, Flask backend, and React frontend running in containers.
- **Integration tests** for Redis, MongoDB connectivity, and API functionality.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for frontend development)
- Python 3.12.3 (for local backend development and testing)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/navaneethkrishna30/WhisperZone.git
cd WhisperZone
```

### Setup Docker Secrets

Create a `.env` file in the project root and define the following secrets:

```
REDIS_PASSWORD=your_redis_password
MONGO_INITDB_ROOT_USERNAME=your_mongo_username
MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
```

## Running the Application with Docker

### Backend Services

This project uses Docker Compose to manage services (backend, Redis, MongoDB).

1. **Build and start the services:**

   ```bash
   docker-compose up --build
   ```

   This will start the backend, Redis, and MongoDB in their respective containers. The backend will be exposed on port `5000`.

2. **Access the application:**

   - The backend API will be available at `http://localhost:5000`.

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

   The frontend will now be available at `http://localhost:5173`.

---

## Running Tests

The application includes integration tests for Redis, MongoDB, and API routes. To run the tests:

1. **Ensure Docker secrets are set for testing** (e.g., `REDIS_PASSWORD`, `MONGO_USER`, `MONGO_PASSWORD`).

2. **Run the tests:**

   ```bash
   docker-compose -f compose-test.yaml up --build --abort-on-container-exit
   ```

   This will start the backend in test mode and automatically run the tests.

---

## Docker Services

The application is divided into the following services:

1. **Backend:**

   - Flask app with WebSocket support via Flask-SocketIO.
   - Manages chat rooms and messages.
   - REST API for creating/joining rooms and saving chat history.

2. **Redis:**

   - Used for real-time, in-memory message storage and room management.

3. **MongoDB:**
   - Used for saving persistent chat history.

---

## Contributing

We welcome contributions from the community. To get started:

1. **Fork the repository.**
   You can do this by clicking the [Fork](https://github.com/navaneethkrishna30/WhisperZone/fork) button on the top right of the repository page.

2. **Create a feature branch:**

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Make your changes.**

4. **Run tests locally to ensure everything works as expected.**

5. **Commit your changes with a descriptive message:**

   ```bash
   git commit -m "Add feature: description of your feature"
   ```

6. **Push the changes to your fork:**

   ```bash
   git push origin feature/my-feature
   ```

7. **Submit a pull request:**

   - Go to the original repository on GitHub.
   - Click on the "Pull Requests" tab.
   - Click the "New Pull Request" button.
   - Select your feature branch and submit the pull request.

8. **Wait for review and feedback.**
   - Address any comments or requested changes.
   - Once approved, your feature will be merged into the main branch.

---

## Local Backend Development

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

The backend will now run locally at `http://localhost:5000`.

## Contributors

Thanks to the following people who have contributed to this project:

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
         <td align="center">
            <a href="https://github.com/navaneethkrishna30">
            <img src="https://avatars.githubusercontent.com/u/107757582?v=4" width="100;" alt="navaneethkrishna30"/>
            <br />
            <sub><b>Navaneeth Krishna</b></sub>
            </a>
         </td>
         <td align="center">
            <a href="https://github.com/yashksaini-coder">
            <img src="https://avatars.githubusercontent.com/u/115717039?v=4" width="100;" alt="yashksaini-coder"/>
            <br />
            <sub><b>Yash Kumar Saini</b></sub>
            </a>
         </td>
         <td align="center">
            <a href="https://github.com/Prithwi32">
            <img src="https://avatars.githubusercontent.com/u/115262737?v=4" width="100;" alt="Prithwi32"/>
            <br />
            <sub><b>Prithwi Hegde</b></sub>
            </a>
         </td>
         <td align="center">
            <a href="https://github.com/rishi-harti768">
            <img src="https://avatars.githubusercontent.com/u/177644202?v=4&size=64" width="100;" alt="rishi-harti"/>
            <br />
            <sub><b>Rishi Harti</b></sub>
            </a>
         </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

## Reporting Issues

If you encounter any bugs or have suggestions for improvements, please open an [issue](https://github.com/navaneethkrishna30/WhisperZone/issues/new) on GitHub.
