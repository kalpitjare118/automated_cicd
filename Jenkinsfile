pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'autocicd'   // Ensure this is correctly set
        DOCKER_CREDENTIALS_ID = 'docker-cred' // Set your Docker credentials ID
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }
        stage('Debug Dependencies') {
            steps {
                echo 'Debugging dependencies to verify Jest is installed...'
                bat 'npm list jest'
            }
        }
        stage('Build Application') {
            steps {
                echo 'Building the application...'
                bat 'npm run build'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npx jest --passWithNoTests'
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}")
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
