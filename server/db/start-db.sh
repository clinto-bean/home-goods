#!/bin/bash

# Load .env file from parent directory
set -o allexport
source ../.env
set +o allexport

# Build Docker image
echo "Building Docker image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME" .

# Check if container already exists
if [ "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Container $CONTAINER_NAME already exists. Starting it..."
    docker start "$CONTAINER_NAME"
else
    echo "Running new container..."
    docker run -d \
        --name "$CONTAINER_NAME" \
        -p "$POSTGRES_PORT":5432 \
        -e POSTGRES_USER="$POSTGRES_USER" \
        -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
        -e POSTGRES_DB="$POSTGRES_DB" \
        "$IMAGE_NAME"
fi

echo "PostgreSQL container '$CONTAINER_NAME' is running on port $POSTGRES_PORT"
