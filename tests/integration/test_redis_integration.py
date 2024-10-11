import pytest
from app import redis

def test_redis_key_value():
    """Test basic Redis key-value store."""
    redis.set('test_key', 'test_value')
    assert redis.get('test_key') == 'test_value'

def test_redis_invalid_key():
    """Test retrieval of a non-existing key from Redis."""
    assert redis.get('invalid_key') is None
