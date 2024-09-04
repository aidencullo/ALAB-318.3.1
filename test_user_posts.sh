#!/bin/bash

# Base URL and API Key
BASE_URL="http://localhost:3000/api/users"
API_KEY="?api-key=perscholas"

# User ID to test
USER_ID="1"  # Replace with the actual user ID you want to test

# Function to send GET request
send_get_request() {
  local endpoint="$1"
  echo "Testing GET $endpoint"
  curl -X GET "$BASE_URL$endpoint$API_KEY"
  echo
}

# Test GET /api/users/:id/posts
send_get_request "/$USER_ID/posts"
