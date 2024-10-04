pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        FRONTEND_IMAGE_NAME = "wcazhar123/frontend-app"
        BACKEND_IMAGE_NAME = "wcazhar123/backend-app"
        IMAGE_TAG = "${env.BUILD_NUMBER}" // Tag images with the Jenkins build number
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository from the master branch
                git branch: 'master', url: 'https://github.com/Ali4669/assignment'
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        // Build frontend image from frontend Dockerfile
                        def frontendImage = docker.build("${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}", "./frontend")
                        // Push frontend image to Docker Hub
                        frontendImage.push()
                        frontendImage.push("latest") // Push latest tag as well
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        // Build backend image from backend Dockerfile
                        def backendImage = docker.build("${BACKEND_IMAGE_NAME}:${IMAGE_TAG}", "./backend")
                        // Push backend image to Docker Hub
                        backendImage.push()
                        backendImage.push("latest") // Push latest tag as well
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    // Stop and remove existing containers if they exist
                    sh "docker stop backend-app || true"
                    sh "docker rm backend-app || true"
                    sh "docker stop frontend-app || true"
                    sh "docker rm frontend-app || true"

                    // Run backend container
                    sh "docker run -d --name backend-app --restart unless-stopped ${BACKEND_IMAGE_NAME}:${IMAGE_TAG}"

                    // Run frontend container
                    sh "docker run -d --name frontend-app --restart unless-stopped -p 3000:3000 ${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Check if backend is healthy
                    def backendHealth = sh(script: "docker inspect --format='{{.State.Health.Status}}' backend-app", returnStdout: true).trim()
                    if (backendHealth == 'healthy') {
                        echo "Backend is healthy."
                    } else {
                        error "Backend is not healthy."
                    }

                    // Check if frontend is healthy
                    def frontendHealth = sh(script: "docker inspect --format='{{.State.Health.Status}}' frontend-app", returnStdout: true).trim()
                    if (frontendHealth == 'healthy') {
                        echo "Frontend is healthy."
                    } else {
                        error "Frontend is not healthy."
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up docker images after build
            sh "docker image prune -f"
            // Stop and remove containers after the build
            sh "docker stop backend-app || true"
            sh "docker rm backend-app || true"
            sh "docker stop frontend-app || true"
            sh "docker rm frontend-app || true"
        }
        success {
            echo 'Docker images built and pushed successfully!'
        }
        failure {
            echo 'The pipeline failed.'
        }
    }
}
