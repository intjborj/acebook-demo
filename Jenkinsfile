pipeline {
    agent any 
    environment {
    DOCKERHUB_CREDENTIALS = credentials('docker-hub')
    }
    stages { 
        stage('Build docker ') {
            steps {  
                sh 'docker-compose build'
                sh 'docker-compose down'
            }
        }

        stage('run docker ') {
            steps {  
                sh 'docker-compose up -d app-api --build'
                sh 'docker-compose up -d'

            }
        }


 	
        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('push image') {
            steps{
                sh 'docker push acemcbmis/acebook-api'
                sh 'docker push acemcbmis/acebook-front'
                sh 'docker push acemcbmis/acebook-filesrv'
            }
        }
}
post {
        always {
            sh 'docker logout'
        }
    }
  }