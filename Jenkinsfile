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
                    sh 'docker push wcazhar123/backend-app:latest'
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    // Directly push the frontend image to the public repository
                    sh 'docker push wcazhar123/frontend-app:latest'
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    // Run the backend container
                    sh 'docker run -d --name monolithic-architecture-example-app-backend-1 -p 8080:8080 wcazhar123/backend-app:latest'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    // Run the frontend container
                    sh 'docker run -d --name monolithic-architecture-example-app-frontend-1 -p 3000:3000 wcazhar123/frontend-app:latest'
                }
            }
        }
    }

    post {
        failure {
            echo 'Build or Push Failed.'
        }
        always {
            script {
                // Clean up by stopping and removing containers if they exist
                sh 'docker stop backend-app || true'
                sh 'docker rm backend-app || true'
                sh 'docker stop frontend-app || true'
                sh 'docker rm frontend-app || true'
            }
        }
    }
}
