pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo '>>> Cloning frontend repository...'
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/vikash8058/cs-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '>>> Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo '>>> Building React app...'
                withCredentials([file(credentialsId: 'frontend-env', variable: 'ENV_FILE')]) {
                    sh 'rm -f .env.production && cp $ENV_FILE .env.production && npm run build'
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                echo '>>> Deploying to Nginx...'
                sh '''
                    sudo cp -r dist/* /var/www/connectsphere/
                    sudo chown -R www-data:www-data /var/www/connectsphere
                '''
            }
        }
    }

    post {
        success {
            echo '>>> Frontend deployed successfully!'
        }
        failure {
            echo '>>> Frontend deployment failed.'
        }
    }
}