pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myapp:latest"
        REGISTRY_URL = "mydockerhub"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kalpitjare118/automated_cicd' // Replace with your repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'  // Install dependencies using npm
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build --prefix client'  // Build the React frontend (assuming the frontend is in a 'client' directory)
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .' 
            }
        }

        stage('Docker Login') {
            steps {
                bat 'docker login -u myusername -p mypassword %REGISTRY_URL%' 
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
                bat 'docker run -d -p 8080:8080 %DOCKER_IMAGE%'  // Update port mappings as needed
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
