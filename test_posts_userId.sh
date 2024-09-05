#!/bin/bash

# Base URL and API Key
BASE_URL="http://localhost:3000/api/posts"
API_KEY="&api-key=perscholas"

# User ID to test
USER_ID="1"  # Replace with the actual user ID you want to test

# Function to send GET request
send_get_request() {
  local user_id="$1"
  echo "Testing GET /api/posts?userId=$user_id"
  curl -L -i -X GET "$BASE_URL?userId=$user_id$API_KEY"
  echo
}

# Test GET /api/posts with the specified userId
send_get_request "$USER_ID"
