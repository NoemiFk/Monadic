import angular from 'angular';
var mainApp = angular.module('mainApp', []);
mainApp.controller('appController',  ['$scope','$http', function ($scope, $http) {
    $scope.title ='Hello Angular Noemi';
    $scope.tasks = {
        data_success: [],
        data_pending: [],
        isLoaded: false,
        isError: false,
        error: ''
    }
    
    $scope.addTask = {
        data: {},
        isLoaded: false,
        isError: false,
        error: '',
        send: add
    }
    $scope.updateTask = {
        data: {},
        isLoaded: false,
        isError: false,
        error: '',
        update: update
    }
    $scope.deleteTask = {
        data: {},
        isLoaded: false,
        isError: false,
        error: '',
        remove: remove
    }
    
    get()
    function get() {
        $scope.tasks.data_success=[]
        $scope.tasks.data_pending=[]
        $http({
            method: 'GET',
            url: 'http://localhost:3000/tasks'
         }).then(resp => {
    
            resp.data.data.forEach(element => {
                if(element.date_end)
                    $scope.tasks.data_success.push(element)
                else
                    $scope.tasks.data_pending.push(element)
            });
    
      
         }).catch(err => {
            console.log(err.data)
         if(err.data==null){
            $scope.tasks.isError= true
            $scope.tasks.error= 'Inicia el servico de Back con nodemon en otra terminal.'
         }
        })
    }

    function add(params) {
        $scope.addTask.isLoaded=true
        console.log(params)
        let body={
            "title":        params.title ,
            "date_start": 	new Date(),
            "status":   	"Pendiente",
            "description": 	params.description
        }
        $http({
            method: 'POST',
            url: 'http://localhost:3000/tasks',
            data:body
         }).then(resp => {
             console.log(resp)
             if(resp.data.success){
                $scope.addTask.isLoaded=false
                $('#TaskAdd').modal('hide')
                $scope.task={}
                console.log($scope.task)
                get()
             }
             else{
                $scope.addTask.isError= true
                $scope.addTask.error=resp.data.type
             }
             
      
         }).catch(err =>{

         })
    }
    function update(params) {
        
        if(params.status=="Completada")
            params.date_end=new Date()
        else
            params.date_end=null
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/tasks/'+params._id,
            data:params
         }).then(resp => {
             console.log(resp)
             if(resp.data.success){
                $scope.addTask.isLoaded=false
                get()

             }
             else{
                $scope.addTask.isError= true
                $scope.addTask.error=resp.data.type
               
             }
             
      
         }).catch(err =>{

         })
    }
    function remove(params) {
         console.log(params)
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/tasks/'+params._id,
            data:params
         }).then(resp => {
             console.log(resp)
             if(resp.data.success){
                $scope.addTask.isLoaded=false
                get()

             }
             else{
                $scope.addTask.isError= true
                $scope.addTask.error=resp.data.type
               
             }
             
      
         }).catch(err =>{

         })
    }


    }]
   
)