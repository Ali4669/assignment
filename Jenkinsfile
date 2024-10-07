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

        stage('Run MongoDB Container') {
            steps {
                script {
                    // Run the MongoDB container
                    sh 'docker run -d --name mongodb --network my_custom_network --ip 192.168.0.30 -e MONGO_INITDB_DATABASE=monolithic_app_db -e MONGO_INITDB_ROOT_USERNAME=ali -e MONGO_INITDB_ROOT_PASSWORD=WCazhar123 mongo'
                }
            }
        }

        stage('Wait for MongoDB to be Ready') {
            steps {
                script {
                    // Wait for MongoDB to be ready before running the backend
                    sh '''
                    for i in {1..30}; do
                        if docker exec mongodb mongo --eval "print(\"waited for\" + $i + \" seconds\")" > /dev/null; then
                            echo "MongoDB is ready"
                            break
                        fi
                        sleep 1
                    done
                    '''
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    // Run the backend container
                    sh 'docker run -d --name monolithic-architecture-example-app-backend-1 --network my_custom_network --ip 192.168.0.20 -p 8080:8080 -e DB_USER=ali -e DB_PW=WCazhar123 -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db wcazhar123/backend-app:latest'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    // Run the frontend container
                    sh 'docker run -d --name monolithic-architecture-example-app-frontend-1 --network my_custom_network --ip 192.168.0.10 -p 3000:3000 -e DB_USER=ali -e DB_PW=WCazhar123 -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db wcazhar123/frontend-app:latest'
                }
            }
        }
    }
}
