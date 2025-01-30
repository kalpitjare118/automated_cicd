pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "kalpitjare/your-app"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials" // Ensure this matches your Jenkins credentials ID
        KUBECONFIG = "C:\\Users\\Dell\\.kube\\config" // Use double backslashes or convert to Unix format
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/kalpitjare118/automated_cicd.git'
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
                        dockerImage.push() // This pushes the image with DOCKER_IMAGE_TAG
                    }
                }
            }
        }

        stage('Check Kubernetes Connection') {
            steps {
                script {
                    withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
                        bat 'kubectl get nodes'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
                        bat '''
                        kubectl apply -f deployment.yaml
                        kubectl apply -f service.yaml
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
