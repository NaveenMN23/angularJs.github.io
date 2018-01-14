mySoccer.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/',{
    //default page
    templateUrl: 'views/year-view.html',
    controller: 'mainController',
    controllerAs: 'maincontroller'
  })
  .when('/matches/:year',{
    //load all JSON data
  	templateUrl: 'views/alldata-view.html',
  	controller:'loadAlldatas',
  	controllerAs:'loadalldatas'
  })
  .when('/knowmore/:soccerteam1/:soccerteam2/:matchdate/:matchyear',{
    //load Single match data
    templateUrl: 'views/loadSingleData-view.html',
    controller: 'loadSingleData',
    controllerAs: 'loadsingledata'
  })
  .when('/teamstatitics/:soccerteam1',{
    //load team statitics
    templateUrl: 'views/loadTeamStatitics-view.html',
    controller: 'AllMatches',
    controllerAs: 'allmatches'
  })
  .otherwise({
    //if none of the above mentioned criteria satisfies
    template   : '<h1>404 page not found</h1>'
  });
}]);
