# SCD Project

This repository contains the source code and documentation for the Software Construction and Development (SCD) project, focused on containerization and Kubernetes deployment.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Team](#team)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Troubleshooting](#troubleshooting)

## Overview
The SCD Project demonstrates containerization and orchestration of a multi-component application using Docker and Kubernetes, with a CI/CD pipeline implemented through GitHub Actions.

## Features
- Three-tier architecture (Frontend, Backend, Admin)
- MongoDB database integration
- Docker containerization
- Kubernetes orchestration
- GitHub Actions for CI/CD
- Self-hosted runners for deployment

## Team
- **Moimma Ali Khan** (22i-1500)
- **Zarmeena Fatima Ali** (22l-7883)

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/MoimmaK/scdProject.git
   ```

2. **Navigate to the project directory:**
   ```
   cd scdProject
   ```

3. **Install dependencies (if not using Docker):**
   ```
   npm install
   ```

## Docker Setup

### Building Docker Images

1. **Admin Panel:**
   ```
   cd admin
   docker build -t test-admin .
   docker run -p 3001:3000 test-admin
   ```
   Access at: http://localhost:3001/

2. **Frontend:**
   ```
   cd ../frontend
   docker build -t test-frontend .
   docker run -d -p 3000:3000 test-frontend
   ```
   Access at: http://localhost:3000/

3. **Backend:**
   ```
   cd ../backend
   docker build -t test-backend .
   docker run -d -p 5000:5000 test-backend
   ```

### Pushing to Docker Hub
```
docker build -t m33na04/frontend:latest ./frontend
docker tag m33na04/frontend:latest m33na04/frontend:latest
docker push m33na04/frontend:latest

docker build -t m33na04/admin:latest ./admin
docker tag m33na04/admin:latest m33na04/admin:latest
docker push m33na04/admin:latest

docker build -t m33na04/backend:latest ./backend
docker tag m33na04/backend:latest m33na04/backend:latest
docker push m33na04/backend:latest
```

## Kubernetes Deployment

### Setup Minikube
```
minikube start --driver=docker
eval $(minikube docker-env)
```

### Applying Kubernetes Manifests
```
kubectl create namespace scd-project
kubectl apply -f k8s/
```

### Checking Deployment Status
```
kubectl get svc -n scd-project
kubectl get pods -n scd-project
```

### Accessing Services
```
minikube service frontend-service -n scd-project --url
minikube service backend-service -n scd-project --url
minikube service admin-service -n scd-project --url
```

## GitHub Actions CI/CD

### Setup Self-Hosted Runner
1. Go to GitHub repository → Settings → Actions → Runners → New self-hosted runner
2. Select Linux/x64 and run the provided commands:
   ```
   mkdir actions-runner && cd actions-runner
   curl -o actions-runner-linux-x64-2.323.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.323.0/actions-runner-linux-x64-2.323.0.tar.gz
   echo "0dbc9bf5a58620fc52cb6cc0448abcca964a8d74b5f39773b7afcad9ab691e19 actions-runner-linux-x64-2.323.0.tar.gz" | shasum -a 256 -c
   tar xzf ./actions-runner-linux-x64-2.323.0.tar.gz
   ./config.sh --url https://github.com/MoimmaK/scdProject --token YOUR_TOKEN
   ./run.sh
   ```

### Workflow Configuration
Create `.github/workflows/deploy.yml` with the following content:
```yaml
name: Build and Deploy to Minikube

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: self-hosted

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Use Minikube's Docker Daemon
      run: |
        echo "Using Minikube Docker daemon"
        eval $(minikube docker-env)

    - name: Build Docker images
      run: |
        docker build -t m33na04/frontend:latest ./frontend
        docker build -t m33na04/backend:latest ./backend
        docker build -t m33na04/admin:latest ./admin

    - name: Login to Docker Hub
      run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

    - name: Push Docker images to Docker Hub
      run: |
        docker push m33na04/frontend:latest
        docker push m33na04/backend:latest
        docker push m33na04/admin:latest

    - name: Apply Kubernetes Manifests
      run: |
        kubectl apply -f k8s/
```

## Troubleshooting

### Common Issues and Solutions
- **Port conflicts**: Verify port mappings in service YAML files
- **Deployment failures**: Check logs with `kubectl logs <pod-name> -n scd-project`
- **Service inaccessibility**: Use `kubectl describe pod <pod-name> -n scd-project` to diagnose issues
- **Container errors**: Verify Docker images and environment variables
- **GitHub Actions failures**: Check runner connectivity and credentials
