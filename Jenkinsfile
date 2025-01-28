pipeline {
    agent any
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
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'npm run build'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npx jest'
            }
        }
        stage('Deploy') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                echo 'Deploying application...'
                // Add deployment steps here (e.g., copying files, restarting services, etc.)
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
