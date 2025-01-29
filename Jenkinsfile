pipeline {
    agent {
        label 'windows' // Ensure Jenkins has a Windows agent with this label
    }

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

        stage('Build') {
            steps {
                bat 'mvn clean package' // Adjust for your build tool
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
