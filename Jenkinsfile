pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/Ali4669/assignment.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                // Navigate to the backend directory
                dir('backend') {
                    // Build the Docker image for the backend
                    script {
                        def backendImageName = 'wcazhar123/backend-app'
                        def backendTag = 'latest' // or specify a different tag if needed
                        sh "docker build -t ${backendImageName}:${backendTag} ."
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                // Navigate to the frontend directory
                dir('frontend') {
                    // Build the Docker image for the frontend
                    script {
                        def frontendImageName = 'wcazhar123/frontend-app'
                        def frontendTag = 'latest' // or specify a different tag if needed
                        sh "docker build -t ${frontendImageName}:${frontendTag} ."
                    }
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                // Push the Docker image for the backend
                script {
                    def backendImageName = 'wcazhar123/backend-app'
                    def backendTag = 'latest' // or specify the same tag used in build
                    sh "docker push ${backendImageName}:${backendTag}"
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                // Push the Docker image for the frontend
                script {
                    def frontendImageName = 'wcazhar123/frontend-app'
                    def frontendTag = 'latest' // or specify the same tag used in build
                    sh "docker push ${frontendImageName}:${frontendTag}"
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Push Successful!'
        }
        failure {
            echo 'Build or Push Failed.'
        }
    }
}
