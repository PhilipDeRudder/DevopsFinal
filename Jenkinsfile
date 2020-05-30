pipeline {
//where to execute
  

   agent any

  tools {nodejs "node"}
//where the 'work' happends

   stages {
      stage('installing') {
         steps {
            echo 'installing node modules...'
            sh 'npm install'
           
         }
      }
      
      /*
        stage('Testing...') {
         steps {
            echo 'testing application'
           sh 'npm run "test --browsers FirefoxHeadless"'
         }
      }
      */
     
     stage('build') {
         steps {
            echo 'testing application'
           sh 'npm run "build"'
         }
      }
     
     stage('Test') {
         steps {
            echo 'Test application'
           
         }
      }
   }
   post {
        success {
            echo 'success!'
            
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            
        }
        
        failure {
            echo 'failure'
            
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            
        }
    }
}

