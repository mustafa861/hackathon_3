#!/bin/bash
set -e

APP_PATH="${1:-.}"
IMAGE_NAME="${2:-learnflow-frontend}"

echo "Building Next.js image: $IMAGE_NAME..."

cd "$APP_PATH" || exit 1

docker build -t "$IMAGE_NAME:latest" .

echo "Loading image to Minikube..."
minikube image load "$IMAGE_NAME:latest"

echo "Image built and loaded successfully"
