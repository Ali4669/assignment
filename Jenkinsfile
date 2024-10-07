pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Ali4669/assignment.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        sh 'docker build -t wcazhar123/backend-app:latest .'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t wcazhar123/frontend-app:latest .'
                    }
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    // Directly push the backend image to the public repository
                    sh 'docker push wcazhar123/backend-app:backend'
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    // Directly push the frontend image to the public repository
                    sh 'docker push wcazhar123/frontend-app:frontend'
                }
            }
        }
    }

    post {
        failure {
            echo 'Build or Push Failed.'
        }
    }
}
