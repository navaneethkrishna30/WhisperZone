import pytest
import time
from app import redis, db
from app import app as flask_app

@pytest.fixture(scope="session")
def wait_for_services():
    """Ensure that Redis and MongoDB are ready before running tests."""
    # Wait for Redis
    for _ in range(10):
        try:
            if redis.ping():
                break
        except Exception:
            time.sleep(1)
    else:
        pytest.fail("Redis is not ready")

    # Wait for MongoDB
    for _ in range(10):
        try:
            if db.command("ping"):
                break
        except Exception:
            time.sleep(1)
    else:
        pytest.fail("MongoDB is not ready")

@pytest.fixture
def app():
    """Fixture to return the Flask app for testing."""
    yield flask_app
