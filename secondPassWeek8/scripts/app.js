angular.module("secondPass", ["ngRoute"])
	.controller("SecondPassController", SecondPassController)
	.directive("secondDirective", secondDirective)
	.config(routingStuff)
	.factory("Cats", Cats);

Cats.$inject = ['$http'];
function Cats($http) {
	var catMethods = {};
	catMethods.getAllCats = function() {
		return $http.get("https://ga-cat-rescue.herokuapp.com/api/cats");
	};
	catMethods.getOneCat = function(id) {
		return $http.get("https://ga-cat-rescue.herokuapp.com/api/cats/" + id);
	};
	return catMethods;
}

routingStuff.$inject = ['$routeProvider'];
function routingStuff($routeProvider) {
	$routeProvider
		.when('/', {
			template: '<h1>You are home!</h1>'
		})
		.when('/about', {
			template: '<h1>This is what its all about!</h1>'
		});
}

SecondPassController.$inject = ["Cats"];
function SecondPassController(Cats) {
	console.log(Cats);
	console.log("Controller is up!");
	var vm = this;
	vm.helloWorld = "hey guys!";
	Cats.getOneCat(372).then(function(response) {
		vm.oneCat = response.data;
	});
	Cats.getAllCats().then(function(response) {
		vm.allCats = response.data;
	});
	this.update = function() {
		console.log("Input is changing!");
	};
}

function secondDirective() {
	return {
		restrict: 'EA',
		templateUrl: 'templates/secondDirective.html',
		scope: {
			derogative: '@'
		}
	};
}