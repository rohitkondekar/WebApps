var app = angular.module('services', ['ngResource']);

app.factory('authService', ['httpService', '$q', '$window', function(httpService, $q, $window){
	
	var userInfo = {};
	var authService = {};

	authService.login = function(user){
		var defered = $q.defer(); 

		httpService.httpCall("POST","/ajax/login.php",user)
		.success(function(data){

			if(data.code==0)
				defered.reject(data.data);
			else{
				userInfo = data.data;		
				$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
				defered.resolve(userInfo);
			};
		})
		.error(function(error){
			defered.reject(error);
		});

		return defered.promise;
	};

	authService.register = function(user){
		var defered = $q.defer();
		httpService.httpCall("POST","/ajax/register.php",user)
		.success(function(data){
			if(data.code==0)
				defered.reject(data.data);
			else{
				defered.resolve(data);
			}
			
		})
		.error(function(error){
			defered.reject(error);
		});

		return defered.promise;
	};


	authService.logout = function(){
		var defered = $q.defer();
		userInfo = null;
		$window.sessionStorage["userInfo"] = null;
		httpService.httpCall("POST","/ajax/logout.php")
		.success(function(data){
			defered.resolve(data);
		})
		.error(function(error){
			defered.reject(error);
		});
	}

	authService.getCurrentUser = function(){
		return userInfo;
	};

	authService.isUserLoggedIn = function(){
		if(userInfo)
			return true;
		else
			return false;
	};
	
	var init = function () {
		if($window.sessionStorage["userInfo"])
			try{
				userInfo = JSON.parse($window.sessionStorage["userInfo"]);
			}
			catch(e){
				console.log("Not valid JSON");
				userInfo = null;
			}
	};
	
	init();

	return authService;
}]);


// --------------------------------------------
// --------------------------------------------

// Restaurant Service

// --------------------------------------------
// --------------------------------------------


app.factory('restaurantService', ['httpService', '$q', function(httpService, $q){
	var restaurantService = {};
	var currentRestaurant;

	restaurantService.getRestaurants = function(){
		var defered = $q.defer();
		httpService.httpCall("POST","/ajax/getRestaurants.php")
		.success(function(data){
			defered.resolve(data);
		})
		.error(function(error){
			defered.reject(error);
		});

		return defered.promise;
	};

	restaurantService.setRestaurant = function(rest){
		currentRestaurant = rest;
	}

	restaurantService.getRestaurant = function(rest){
		return currentRestaurant;
	}


	restaurantService.getMenu = function(restaurant){
		var defered = $q.defer();
		httpService.httpCall("POST","/ajax/getMenu.php",restaurant)
		.success(function(data){
			defered.resolve(data);
		})
		.error(function(error){
			defered.reject(error);
		});

		return defered.promise;
	}

	return restaurantService;

}])


app.factory('httpService', ['$http', function($http){
		
	var httpService = {};
	httpService.httpCall = function(myMethod,myURL,myData){
		return $http({
                method: myMethod,
                url: myURL,
                data: myData
            })
	}

	return httpService;
}]);