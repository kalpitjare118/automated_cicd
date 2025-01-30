pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myapp:latest"
        REGISTRY_URL = "docker.io"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kalpitjare118/automated_cicd'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Install both frontend & backend dependencies
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build' // Build for frontend (Vite) and backend (if applicable)
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .' // Build Docker image
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                bat 'docker tag %DOCKER_IMAGE% %REGISTRY_URL%/%DOCKER_USER%/%DOCKER_IMAGE%'
                bat 'docker push %REGISTRY_URL%/%DOCKER_USER%/%DOCKER_IMAGE%'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker run -d -p 8080:8080 %DOCKER_IMAGE%'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
