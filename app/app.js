var app = angular.module('myApp', ['ngRoute','services','controllers']);

app.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    	$locationProvider.html5Mode(true);
        $routeProvider.
        	when('/',{
        		redirectTo: '/home'
        	}).
        	when('/home',{
                templateUrl: 'partials/home.html',
                controller: 'homeController'
            }).
            when('/login',{
                templateUrl: 'partials/login.html',
                controller: 'indexController'
            }).
            when('/register',{
                templateUrl: 'partials/register.html',
                controller: 'registerController'
            }).            
            when('/list',{
                templateUrl: 'partials/list.html',
                controller: 'listController',        
            }).

                		
            when('/details',{
                templateUrl: 'partials/details.html',
                controller: 'detailsController'
            }).            
            otherwise({
                redirectTo: '/home'
            });
}]);



app.run(function($rootScope,$location,authService){
	
	// Event Register for Session Check Routing
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		
		if(next.templateUrl != "partials/home.html" && !authService.isUserLoggedIn() && next.templateUrl != "partials/login.html" && next.templateUrl != "partials/register.html")
			$location.path("/login");
	});

	// Function used to navigate using button button clicks
	$rootScope.go = function ( path ) {
  		$location.path( path );
	};
});

