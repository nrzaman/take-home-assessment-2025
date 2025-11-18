#!/bin/bash

# Start the Python backend in the background
echo "Starting Python backend..."
cd src/api
python3 route.py &
backend_pid=$!
cd ../..

# Start the React frontend
echo "Starting React frontend..."
npm start &
frontend_pid=$!

echo "Backend PID: $backend_pid"
echo "Frontend PID: $frontend_pid"

# Function to kill processes on exit
cleanup() {
    echo "Stopping processes..."
    kill $backend_pid
    kill $frontend_pid
    wait $backend_pid 2>/dev/null # Wait for Python to terminate
    wait $frontend_pid 2>/dev/null # Wait for React to terminate
    echo "Processes terminated."
}

# Trap Ctrl+C (SIGINT) and call the cleanup function
trap cleanup SIGINT

echo "Python and React apps are running. Press Ctrl+C to stop."

# Wait indefinitely for the trap to be triggered
wait