#!/bin/bash

# Start the Python backend in the background
echo "Starting Python backend tests..."
cd src/api
# Check if pytest is found
if ! command -v pytest &> /dev/null; then
    echo "pytest command not found. Creating a virtual environment and installing pytest."
    cd ../..

    # Create a virtual environment named 'venv'
    python3 -m venv .venv

    # Activate the virtual environment
    source .venv/bin/activate

    # Install pytest inside the virtual environment
    pip3 install -r requirements.txt

    echo "pytest installed in the virtual environment. You can now run tests."
    cd src/api
else
    echo "pytest command found. Proceeding without creating a new virtual environment."
fi
pytest
cd ../..

# Start the React frontend
echo "Starting React frontend tests..."
npm test -- --watchAll=false

# Trap Ctrl+C (SIGINT) and call the cleanup function
trap SIGINT

echo "Python and React tests have completed running. Press Ctrl+C to exit."

# Wait indefinitely for the trap to be triggered
wait