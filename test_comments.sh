#!/bin/bash

# Base URL and API Key
BASE_URL="http://localhost:3000"
SUB_URL="/api/comments"
API_KEY="&api-key=perscholas"

# Function to send GET request
send_get_request() {
  echo "Testing GET /api/comments"
  curl -L -i -X GET "$BASE_URL$SUB_URL?$API_KEY" -H "Content-Type: application/json"
  echo
}

# Test GET /api/posts with the specified userId
send_get_request
