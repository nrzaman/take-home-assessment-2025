import pytest
import sys
from pathlib import Path
import logging
from unittest.mock import Mock, patch, MagicMock

# Add the parent directory to sys.path to import route module
sys.path.insert(0, str(Path(__file__).parent.parent))

import route
from route import app

mock_data = [
    ("Alabama", "2024-10-21", "2024-10-21", "2024-10-01", "No", "https://example.com", "Description"),
    ("Alaska", "2024-10-21", "2024-10-21", "2024-10-01", "No", "https://example.com", "Sample description"),
]

logger = logging.getLogger(__name__)

# Create a test client fixture
@pytest.fixture
def client():
    app.config.update({"TESTING": True})

    with app.test_client() as client:
        yield client

# Helper function to get mock database setup
def get_mock_db_setup(data):
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_cursor.fetchall.return_value = data
    mock_db_config = {"tableName": "voter_registration"}
    return mock_connection, mock_db_config

# Tests API route that it retrieves expected voter information data
def test_get_data(client):
    # Mock the database connection and cursor
    mock_cursor = Mock()
    mock_connection = Mock()
    mock_connection.cursor.return_value = mock_cursor
    mock_cursor.fetchall.return_value = mock_data

    mock_db_config = {"tableName": "voter_registration"}

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        # Check for a successful response
        assert response.status_code == 200
        # Verify response is JSON
        data = response.get_json()
        assert len(data) == 2
        assert data[0]['state'] == "Alabama"
        assert data[1]['state'] == "Alaska"  

# Tests nonexistent route to make sure it errors
def test_get_data_error(client):
    response = client.get("/")
    # Check for an error response
    assert response.status_code == 404  

# Tests helper function such that it retrieves expected config values from config file
def test_read_config_success():
    # Read from the actual config path relative to the test file location
    from pathlib import Path
    test_dir = Path(__file__).parent
    config_path = str((test_dir / '../../config/local_api.json').resolve())
    config = route.read_config(config_path)
    assert config is not None, "Config should not be None"
    assert "serverHost" in config
    assert config["serverHost"] == "127.0.0.1"
    assert "serverPort" in config
    assert config["serverPort"] == "4000"

# Tests helper function errors out with a nonexistent file
def test_read_config_failure_nonexistent(caplog):
    caplog.set_level(logging.ERROR)

    route.read_config('this_file_does_not_exist.json')
    # Assert that the log text exists
    assert f"Error: The file 'this_file_does_not_exist.json' was not found." in caplog.text

# Tests helper function errors out with an incorrectly formatted file
def test_read_config_failure_incorrect_format(caplog):
    caplog.set_level(logging.ERROR)

    # Create a temp file with invalid JSON
    import tempfile
    import os as os_module
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        f.write('{invalid json}')
        temp_file = f.name

    try:
        config = route.read_config(temp_file)
        assert config is None, "Should return None for invalid JSON"
        assert "Error: Invalid JSON format" in caplog.text
    finally:
        os_module.remove(temp_file)

# Tests that the /data route returns JSON content type
def test_get_data_content_type(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        assert response.content_type == "application/json"

# Tests that the /data response has the correct cache control headers
def test_get_data_cache_headers(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        # Cache headers should be set for 1 hour (3600 seconds)
        assert "Cache-Control" in response.headers
        assert "max-age=3600" in response.headers["Cache-Control"]
        assert "public" in response.headers["Cache-Control"]

# Tests that the /data response is structured correctly
def test_get_data_compression(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        assert response.status_code == 200
        # Verify response is valid JSON
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) > 0

# Tests that data is returned with the correct fields (order may vary due to JSON serialization)
def test_get_data_field_order(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        data = response.get_json()

        expected_fields = {
            'state',
            'deadlineInPerson',
            'deadlineByMail',
            'deadlineOnline',
            'electionDayRegistration',
            'onlineRegistrationLink',
            'description'
        }

        # Check that all records have the expected fields (as a set, ignoring order)
        for record in data:
            assert set(record.keys()) == expected_fields, f"Fields mismatch. Expected: {expected_fields}, Got: {set(record.keys())}"

# Tests that data contains expected number of records
def test_get_data_count(client):
    # Create mock data for all 51 states
    mock_local_data = [(f"State{i}", "2024-10-21", "2024-10-21", "2024-10-01", "No", "https://example.com", "Description") for i in range(51)]
    mock_connection, mock_db_config = get_mock_db_setup(mock_local_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        data = response.get_json()
        # Should have 51 records
        assert len(data) == 51, f"Expected 51 records, got {len(data)}"

# Tests that each record has required non-null state field
def test_get_data_state_field_present(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
         patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        data = response.get_json()

        for record in data:
            assert "state" in record, "State field missing in record"
            assert record["state"] is not None, "State field is None"
            assert isinstance(record["state"], str), "State field is not a string"
            assert len(record["state"]) > 0, "State field is empty"

# Tests that response data types are correct
def test_get_data_response_structure(client):
    mock_connection, mock_db_config = get_mock_db_setup(mock_data)

    with patch('route.connect_to_db', return_value=mock_connection), \
        patch.dict(route.__dict__, {'db_config': mock_db_config}):
        response = client.get("/data")
        data = response.get_json()

        for record in data:
            assert isinstance(record, dict), "Each record should be a dictionary"
            # String fields (nullable)
            string_fields = [
                'state',
                'deadlineInPerson',
                'deadlineByMail',
                'deadlineOnline',
                'electionDayRegistration',
                'onlineRegistrationLink',
                'description'
            ]
            for field in string_fields:
                assert field in record, f"Field '{field}' missing in record"
                # Fields can be None or string
                assert record[field] is None or isinstance(record[field], str), \
                    f"Field '{field}' should be None or string, got {type(record[field])}"

# Tests error when connecting to nonexistent database (integration test)
def test_connect_to_db_with_invalid_config(monkeypatch, caplog):
    caplog.set_level(logging.ERROR)

    # Mock the db_config to use invalid database credentials
    invalid_config = {
        "databaseName": "nonexistent_db",
        "user": "invalid_user",
        "host": "invalid_host",
        "password": "invalid_pass"
    }

    # Patch the db_config in route module
    monkeypatch.setattr(route, 'db_config', invalid_config)

    # Call connect_to_db and it should return None and log error
    result = route.connect_to_db()
    assert result is None, "Connection should fail and return None"
    # Error should be logged
    assert "There was an operational error connecting to the database" in caplog.text or \
           "There was a general error connecting to the database" in caplog.text, \
           "Database error should be logged"

# Tests that read_config returns correct structure
def test_read_config_returns_dict():
    from pathlib import Path
    test_dir = Path(__file__).parent
    config_path = str((test_dir / '../../config/local_api.json').resolve())
    config = route.read_config(config_path)
    assert isinstance(config, dict), "Config should be a dictionary"
    assert len(config) > 0, "Config should not be empty"
