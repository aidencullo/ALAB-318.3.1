#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/api"

# API Key
API_KEY="?api-key=perscholas"

# Function to send GET request
send_get_request() {
  local endpoint="$1"
  echo "Testing GET $endpoint"
  curl -X GET "$BASE_URL$endpoint$API_KEY"
  echo
}

# Function to send POST request
send_post_request() {
  local endpoint="$1"
  local data="$2"
  echo "Testing POST $endpoint"
  curl -X POST "$BASE_URL$endpoint$API_KEY" -H "Content-Type: application/json" -d "$data"
  echo
}

# Function to send PATCH request
send_patch_request() {
  local endpoint="$1"
  local data="$2"
  echo "Testing PATCH $endpoint"
  curl -X PATCH "$BASE_URL$endpoint$API_KEY" -H "Content-Type: application/json" -d "$data"
  echo
}

# Function to send DELETE request
send_delete_request() {
  local endpoint="$1"
  echo "Testing DELETE $endpoint"
  curl -X DELETE "$BASE_URL$endpoint$API_KEY"
  echo
}

# Test GET /
send_get_request "/"

# Test GET /api
send_get_request ""

# Test GET /api/users
send_get_request "/users"

# Test POST /api/users
USER_POST_DATA='{"name": "Carey", "username": "yare23", "email": "cy2@example.com"}'
send_post_request "/users" "$USER_POST_DATA"

# Test GET /api/users/:id
USER_ID="1"
send_get_request "/users/$USER_ID"

# Test PATCH /api/users/:id
USER_PATCH_DATA='{"name": "Carey Updated"}'
send_patch_request "/users/$USER_ID" "$USER_PATCH_DATA"

# Test DELETE /api/users/:id
send_delete_request "/users/$USER_ID"

# Test GET /api/posts
send_get_request "/posts"

# Test POST /api/posts
POST_POST_DATA='{
  "userId": 1,
  "title": "delectus ullam et corporis nulla voluptas sequi",
  "content": "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum"
}'
send_post_request "/posts" "$POST_POST_DATA"

# Test GET /api/posts/:id
POST_ID="3"
send_get_request "/posts/$POST_ID"

# Test PATCH /api/posts/:id
POST_PATCH_DATA='{"title": "Updated Post Title"}'
send_patch_request "/posts/$POST_ID" "$POST_PATCH_DATA"

# Test DELETE /api/posts/:id
send_delete_request "/posts/$POST_ID"
