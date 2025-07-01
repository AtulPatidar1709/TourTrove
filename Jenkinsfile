@Library("Shared") _
pipeline {
    
    agent { label 'vinod' }
    
    stages {
        stage("Hello"){
            steps{
                script{
                    hello()
                }
            }
        }
        stage('Code'){
            steps {
                script{
                    clone("https://github.com/AtulPatidar1709/TourTrove.git", "master")
                }
            }
        }
        stage('Build'){
            steps {
                script{
                    docker_build("vison-space", "latest", "patidar17")
                }
            }
        }

        stage('Push to DockerHub'){
            steps {
                echo "This is pushing the image to Docker Hub."
                script{
                    docker_push("DockerHubCred", "vison-space")
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "This is Deploying the code"
                docker_compose()
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
