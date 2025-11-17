import pytest
import sys
from pathlib import Path

# Add the parent directory to sys.path to import route module
sys.path.insert(0, str(Path(__file__).parent.parent))

from route import app

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

# Create a test client fixture
@pytest.fixture
def client():
    app.config.update({"TESTING": True})

    with app.test_client() as client:
        yield client

def test_get_data(client):
    response = client.get("/data")
    # Check for a successful response
    assert response.status_code == 200  
    # Assert expected content (all 50 states + District of Colombia) in the response
    for s in states:
        assert s.encode() in response.data  