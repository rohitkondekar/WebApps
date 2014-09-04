var app = angular.module('controllers', []);


app.controller('indexController', ['$scope','authService','$location','$rootScope', function($scope,authService,$location,$rootScope){
	console.log("In indexController");
	
	$rootScope.currentUser = authService.getCurrentUser();
	if($rootScope.currentUser)
		$rootScope.isLoggedIn = false;

	$scope.login = function(){		
		authService.login($scope.user)
		.then(function(data){
			console.log("success");
			$rootScope.currentUser = data;
			$rootScope.isLoggedIn = true;
			console.log($scope.currentUser);
			$scope.err= false;
			$location.path('/home');
		}, function(error){
			console.log(error);
			$location.path('/login');
			$scope.err = true;
		})

	};

	$scope.logout = function(){
		authService.logout();
		$rootScope.isLoggedIn = false;
		$location.path('/home');
	}

	function init(){
		$rootScope.currentUser = authService.getCurrentUser();
		if($rootScope.currentUser)
			$rootScope.isLoggedIn = true;
	}

	init();

}]);

app.controller('homeController', ['$scope', function($scope){
	console.log("In homeController");

}]);


app.controller('listController', ['$scope','restaurantService','$location', function($scope,restaurantService,$location){
	console.log("In listController");

    $scope.getRestaurants = function(){
    	restaurantService.getRestaurants()
    	.then(function(data){
			$scope.restaurants = data;
			console.log($scope.restaurants);
    	},function(error){

    	});

    };

	$scope.getRestaurants();

    $scope.clickedRestaurant = function(){
        restaurantService.setRestaurant(this.restaurant);
        console.log(restaurantService.getRestaurant);
        $location.path("/details");
    };

	//-------
    //Column Sorting
    //-------
    $scope.sort = {
        column: '',
        descending: false
    };
    $scope.changeSorting = function(column) {

        var sort = $scope.sort;

        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };


}]);



app.controller('detailsController', ['$scope','restaurantService', function($scope,restaurantService){
	console.log("In detailsController");
    
    $scope.restaurant = restaurantService.getRestaurant();

    if (!$scope.restaurant.name){
        $location.path("/list");
    }

    $scope.getMenu = function(){

    	restaurantService.getMenu($scope.restaurant)
    	.then(function(data){
                if(data!="false"){
                    $scope.items = data;
                }
    	},function(error){

    	});

    }();

    //-------
    //Column Sorting
    //-------
    $scope.sort = {
        column: '',
        descending: false
    };
    $scope.changeSorting = function(column) {

        var sort = $scope.sort;

        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

}]);



app.controller('registerController', ['$scope','authService', function($scope,authService){
	console.log("In registerController!");

	$scope.registerUser = function(user){
		authService.register(user)
		.then(function(data){
			console.log("success");
			console.log(data);
		},function(error){
			console.log(error);
		})
	};

}]);