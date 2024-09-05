#!/bin/bash

# Base URL and API Key
BASE_URL="http://localhost:3000/api"
API_KEY="?api-key=perscholas"

# Function to send GET request
send_get_request() {
  local endpoint="$1"
  echo "Testing GET $endpoint"
  curl -i -X GET "$BASE_URL$endpoint$API_KEY"
  echo
}


# Function to send POST request
send_post_request() {
  local endpoint="$1"
  local data="$2"
  echo "Testing POST $endpoint"
  curl -i -X POST "$BASE_URL$endpoint$API_KEY" -H "Content-Type: application/json" -d "$data"
  echo
}

# Test GET /api/users
send_get_request "/comments"

# Test POST /api/users
USER_COMMENT='{"userId": 1, "postId": 1, "body": "This is a test comment"}'
send_post_request "/comments" "$USER_COMMENT"

# Fail Test POST /api/users -> 400 Bad Request
BAD_USER_COMMENT='{"postId": 1, "body": "This is a test comment"}'
send_post_request "/comments" "$BAD_USER_COMMENT"
