pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "kalpit/your-app"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials" // Ensure this matches your Jenkins credentials ID
        KUBECONFIG = "C:\Users\Dell\.kube\config" // Specify the path to the kubeconfig file
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kalpitjare118/automated_cicd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")

                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                        dockerImage.push('latest') // Push latest tag explicitly
                    }
                }
            }
        }

        stage('Check Kubernetes Connection') {
            steps {
                script {
                    // Ensure kubectl can connect to the cluster
                    withEnv(['KUBECONFIG=C:\Users\Dell\.kube\config']) {
                        bat 'kubectl get nodes'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply resources to Kubernetes
                    withEnv(['KUBECONFIG=C:\Users\Dell\.kube\config']) {
                        bat '''
                        kubectl apply --validate=false -f deployment.yaml
                        kubectl apply --validate=false -f service.yaml
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
