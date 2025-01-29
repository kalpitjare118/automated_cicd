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

        stage('Build Backend') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Docker Login') {
            steps {
                bat 'echo "mypassword" | docker login -u myusername --password-stdin %REGISTRY_URL%'
            }
        }

        stage('Push to Registry') {
            steps {
                bat 'docker tag %DOCKER_IMAGE% %REGISTRY_URL%/%DOCKER_IMAGE%'
                bat 'docker push %REGISTRY_URL%/%DOCKER_IMAGE%'
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
