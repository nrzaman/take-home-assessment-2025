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

# Wait for both processes to finish (or for a signal to terminate them)
wait $backend_pid
wait $frontend_pid

echo "Both processes terminated."