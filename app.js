var app = angular.module("ToDo",[]);

//mise en place d'un controller pour mon appli
app.controller("TodoCtrl", function($scope, filterFilter, $http){
	$scope.placeholder = "Chargement ..."
	//creation d'un tableau d'objet
	$scope.todos = [
	//tableau vide avant récup
					// {
					// 	name : "manger",
					// 	completed : true
					// },
					// {
					// 	name : "travailler",
					// 	completed : false
					// },
					// {
					// 	name : "repasser",
					// 	completed : false
					// }
					];
	//récup des tâches depuis un script php
	$http.get('todos.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = "Ajouter une tâche..."
	});

	$scope.remaining = $scope.todos.length;


	//mise en place d'un observeur sur le tableau des tâches
	$scope.$watch("todos",function(){
		//ajout d'un filtre pour ne compter que les tâches restantes
		$scope.remaining = filterFilter($scope.todos, {completed:false}).length;
	},true);

	$scope.removeTodo = function(index){
		console.log("index= "+ index);
		//splice supprime un nombre d'entrée donné en param 2
		//à partir de l'index donnée en param 1, ici 1 seul entrée
		$scope.todos.splice(index, 1);
	}


	$scope.addTodo = function(){
		//on ajoute, une entrée au tableau
		if($scope.newTodo != "" && $scope.newTodo != undefined){

			$scope.todos.push({

				name : $scope.newTodo,
				completed : false
			});
			//on vide le champ de saisie
			$scope.newTodo = "";
			}
		};

	//gestion de la checkbox pour cocher toutes les tâches
	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
			todo.completed = allchecked;
		});
	};

});