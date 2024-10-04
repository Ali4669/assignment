pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        FRONTEND_IMAGE_NAME = "wcazhar123/frontend-app"
        BACKEND_IMAGE_NAME = "wcazhar123/backend-app"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/Ali4669/assignment'
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        // Build frontend image from frontend Dockerfile
                        def frontendImage = docker.build("${FRONTEND_IMAGE_NAME}", "./frontend")
                        // Push frontend image to Docker Hub
                        frontendImage.push("latest")
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        // Build backend image from backend Dockerfile
                        def backendImage = docker.build("${BACKEND_IMAGE_NAME}", "./backend")
                        // Push backend image to Docker Hub
                        backendImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up docker images after build
            sh "docker image prune -f"
        }
        success {
            echo 'Docker images built and pushed successfully!'
        }
        failure {
            echo 'The pipeline failed.'
        }
    }
}
