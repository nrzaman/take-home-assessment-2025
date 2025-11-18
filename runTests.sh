#!/bin/bash

# Start the Python backend in the background
echo "Starting Python backend tests..."
cd src/api
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