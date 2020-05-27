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
}

