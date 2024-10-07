pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from the repository
                git 'https://github.com/Ali4669/assignment.git'
            }
        }

        stage('Create Custom Network') {
            steps {
                script {
                    // Create the custom Docker network if it doesn't exist
                    sh '''
                    docker network create --subnet=192.168.0.0/24 my_custom_network || true
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        // Build the frontend Docker image
                        sh 'docker build -t wcazhar123/frontend-app:latest .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        // Build the backend Docker image
                        sh 'docker build -t wcazhar123/backend-app:latest .'
                    }
                }
            }
        }

        stage('Run MongoDB Container') {
            steps {
                script {
                    // Start MongoDB container with specified configurations
                    sh '''
                    docker run -d --name mongodb \
                    --network my_custom_network \
                    -e MONGO_INITDB_DATABASE=monolithic_app_db \
                    -e MONGO_INITDB_ROOT_USERNAME=ali \
                    -e MONGO_INITDB_ROOT_PASSWORD=WCazhar123 \
                    --ip 192.168.0.30 \
                    -p 27017:27017 \
                    mongo
                    '''
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    // Wait for MongoDB to be ready
                    sh '''
                    for i in {1..30}; do
                        if docker exec mongodb mongo --eval "print(\"waited for\" + $i + \" seconds\")" > /dev/null; then
                            echo "MongoDB is ready"
                            break
                        fi
                        sleep 1
                    done
                    '''
                    
                    // Run the backend container
                    sh '''
                    docker run -d --name backend-app \
                    --network my_custom_network \
                    -e DB_USER=ali \
                    -e DB_PW=WCazhar123 \
                    -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db \
                    -p 8080:8080 \
                    wcazhar123/backend-app:latest
                    '''
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    // Run the frontend container
                    sh '''
                    docker run -d --name frontend-app \
                    --network my_custom_network \
                    -e DB_USER=ali \
                    -e DB_PW=WCazhar123 \
                    -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db \
                    -p 3000:3000 \
                    wcazhar123/frontend-app:latest
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup containers and the custom network after the build
                sh '''
                docker rm -f mongodb backend-app frontend-app || true
                docker network rm my_custom_network || true
                '''
            }
        }
    }
}
