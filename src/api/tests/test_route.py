import pytest
import sys
import route
from route import app
from pathlib import Path
import os
import logging

# Add the parent directory to sys.path to import route module
sys.path.insert(0, str(Path(__file__).parent.parent))

# All expected 50 states + District of Colombia to be included in the response
states = ["Alabama", 
          "Alaska", 
          "Arizona", 
          "Arkansas", 
          "California", 
          "Colorado", 
          "Connecticut", 
          "Delaware",
          "District of Columbia", 
          "Florida", 
          "Georgia", 
          "Hawaii", 
          "Idaho", 
          "Illinois", 
          "Indiana", 
          "Iowa", 
          "Kansas", 
          "Kentucky", 
          "Louisiana", 
          "Maine", 
          "Maryland", 
          "Massachusetts", 
          "Michigan", 
          "Minnesota", 
          "Mississippi", 
          "Missouri", 
          "Montana", 
          "Nebraska", 
          "Nevada", 
          "New Hampshire", 
          "New Jersey", 
          "New Mexico", 
          "New York", 
          "North Carolina", 
          "North Dakota", 
          "Ohio", 
          "Oklahoma", 
          "Oregon", 
          "Pennsylvania", 
          "Rhode Island", 
          "South Carolina", 
          "South Dakota", 
          "Tennessee", 
          "Texas", 
          "Utah", 
          "Vermont", 
          "Virginia", 
          "Washington", 
          "West Virginia", 
          "Wisconsin", 
          "Wyoming"]

logger = logging.getLogger(__name__)

# Create a test client fixture
@pytest.fixture
def client():
    app.config.update({"TESTING": True})

    with app.test_client() as client:
        yield client

# Tests API route that it retrieves expected voter information data
def test_get_data(client):
    response = client.get("/data")
    # Check for a successful response
    assert response.status_code == 200  
    # Assert expected content (all 50 states + District of Colombia) in the response
    for s in states:
        assert s.encode() in response.data  

# Tests helper function such that it retrieves expected config values from config file
def test_read_config_success():
    config = route.read_config('../config/local_api.json')
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

    route.read_config('./tests/incorrect_format.json')
    # Assert that the log text exists
    assert f"Error: Invalid JSON format in './tests/incorrect_format.json'" in caplog.text
    