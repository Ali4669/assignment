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
                    sh 'docker push wcazhar123/backend-app:latest'
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    sh 'docker push wcazhar123/frontend-app:latest'
                }
            }
        }

        stage('Create Docker Network') {
            steps {
                script {
                    // Create the network if it does not exist
                    sh '''
                    if ! docker network ls | grep my_custom_network; then
                        docker network create --subnet=192.168.0.0/24 my_custom_network;
                    else
                        echo "Network my_custom_network already exists."
                    fi
                    '''
                }
            }
        }


        stage('Run MongoDB Container') {
    steps {
        script {
            // Run the MongoDB container using the network name
            sh 'docker run -d --name mongodb --network  my_custom_network1 --ip 192.168.0.30 -e MONGO_INITDB_DATABASE=monolithic_app_db -e MONGO_INITDB_ROOT_USERNAME=ali -e MONGO_INITDB_ROOT_PASSWORD=WCazhar123 mongo'
        }
    }
}


        stage('Wait for MongoDB to be Ready') {
            steps {
                script {
                    sh '''
                    for i in {1..30}; do
                        if docker exec mongodb mongo --username ali --password WCazhar123 --eval "db.stats()" > /dev/null; then
                            echo "MongoDB is ready"
                            break
                        fi
                        echo "Waiting for MongoDB... ($i seconds)"
                        sleep 2
                    done
                    '''
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                script {
                    sh 'docker run -d --name monolithic-architecture-example-app-backend-1 --network my_custom_network1 -p 8080:8080 -e DB_USER=ali -e DB_PW=WCazhar123 -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db wcazhar123/backend-app:latest'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                script {
                    sh 'docker run -d --name monolithic-architecture-example-app-frontend-1 --network my_custom_network1 -p 3000:3000 -e DB_USER=ali -e DB_PW=WCazhar123 -e MONGO_URI=mongodb://ali:WCazhar123@mongodb:27017/monolithic_app_db wcazhar123/frontend-app:latest'
                }
            }
        }
    }
}
