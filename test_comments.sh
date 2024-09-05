#!/bin/bash

# Base URL and API Key
BASE_URL="http://localhost:3000/api"
API_KEY="?api-key=perscholas"

# Function to send GET request
send_get_request() {
  local endpoint="$1"
  local queryParam="$2"
  echo "Testing GET $endpoint"
  curl -i -X GET "$BASE_URL$endpoint$API_KEY$queryParam"
  echo
}

# Function to send PATCH request
send_patch_request() {
  local endpoint="$1"
  local data="$2"
  echo "Testing PATCH $endpoint"
  curl -i -X PATCH "$BASE_URL$endpoint$API_KEY" -H "Content-Type: application/json" -d "$data"
  echo
}

# Function to send DELETE request
send_delete_request() {
  local endpoint="$1"
  echo "Testing DELETE $endpoint"
  curl -i -X DELETE "$BASE_URL$endpoint$API_KEY"
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

# Test GET /comments/:id -> 200 OK
COMMENT_ID="1" # Replace with a valid comment ID for testing
send_get_request "/comments/$COMMENT_ID"

# Test PATCH /comments/:id -> 200 OK
UPDATED_COMMENT='{"body": "This is an updated test comment"}'
send_patch_request "/comments/$COMMENT_ID" "$UPDATED_COMMENT"
# Test GET /comments/:id -> 200 OK
send_get_request "/comments/$COMMENT_ID"

# Test DELETE /comments/:id -> 200 OK
send_delete_request "/comments/$COMMENT_ID"
# Test GET /comments/:id -> 404 Not Found
send_get_request "/comments/$COMMENT_ID"

# Test POST /api/comments -> 201 Created
USER_COMMENT='{"userId": 1, "postId": 1, "body": "This is a test comment"}'
send_post_request "/comments" "$USER_COMMENT"
# Test GET /comments -> 200 OK
send_get_request "/comments"

# Fail Test POST /api/comments -> 400 Bad Request
BAD_USER_COMMENT='{"postId": 1, "body": "This is a test comment"}'
send_post_request "/comments" "$BAD_USER_COMMENT"

# GET /comments?userId=<VALUE> -> 200 OK
send_get_request "/comments"
send_get_request "/comments" "&userId=1&postId=1"
