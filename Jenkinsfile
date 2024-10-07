pipeline {
    agent any

    environment {
        // Define image names based on your Docker Hub repos
        BACKEND_IMAGE = 'wcazhar123/backend-app'
        FRONTEND_IMAGE = 'wcazhar123/frontend-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/Ali4669/assignment.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') { // Navigate to the backend directory
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') { // Navigate to the frontend directory
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                // Push the backend image to Docker Hub
                sh 'docker push $BACKEND_IMAGE'
            }
        }

        stage('Push Frontend Image') {
            steps {
                // Push the frontend image to Docker Hub
                sh 'docker push $FRONTEND_IMAGE'
            }
        }
    }
}
