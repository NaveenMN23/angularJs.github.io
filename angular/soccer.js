//Declaring a Module
var mySoccer = angular.module('soccer',['ngRoute']);
//Main controller to display year
mySoccer.controller('mainController',['$http',function($http) {
  //Declaring variables and Empty arrays
  var main = this;
  this.heading = 'SOCCER INFO';
  this.subHeading = 'Information about Soccer Game';
  this.soccerInfo2K16 = [];
  this.soccerInfo2K17 = [];
  //JSON DATA
  this.baseUrl2K16 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.baseUrl2K17 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  //code block to get the json data for 2K15 - 2K16
  this.loadSoccerInfo2K16 = function(){
    $http({
      method: 'GET',
      url: main.baseUrl2K16
    }).then(function successCallback(response){
      // on success save the json data into a variable
      main.soccerInfo2K16 = response.data.name;
    }, function errorCallback(response){
      // On error alert back
      alert("some error occurred. Check the console.");
    });
  };
  //code block to get the json data for 2K16 - 2K17
  this.loadSoccerInfo2K17 = function(){
    $http({
      method: 'GET',
      url: main.baseUrl2K17
    }).then(function successCallback(response){
      // on success save the json data into a variable
      main.soccerInfo2K17 = response.data.name;
    }, function errorCallback(response){
      // On error alert back
      alert("some error occurred. Check the console.");
    });
  };
}]);

//Controller to display all team datas
mySoccer.controller('loadAlldatas',['$http','$routeParams',function($http,$routeParams){
  //Declaring variables and Empty arrays
  var main = this;
  this.soccerHeading = "";
  this.allsoccerInfo = "";
  this.year = $routeParams.year;
  //code block to call the json data based on the year
  if(this.year == 17){
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  }
  else{
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  }
  //code block to get the json datas
  this.loadAllSoccerDatas = function(){
    $http({
      method:'GET',
      url:main.baseUrl
    }).then(function successCallback(response){
      //on success call this function
      main.soccerHeading = response.data;
      main.allsoccerInfo = main.year;
    }, function errorCallback(response){
      //Alert if any error
      alert("some error occurred. Check the console.");
    });
  };
}]);

mySoccer.controller('loadSingleData',['$http','$routeParams',function($http,$routeParams){
  //Declaring variables
  var main=this;
  this.soccerHeading = "Match Details";
  this.soccerSeriesName = "";
  this.soccerDay = "";
  this.team1 = $routeParams.soccerteam1;
  this.team2 = $routeParams.soccerteam2;
  this.Goal1 = "";
  this.Goal2 = "";
  this.matchDate = $routeParams.matchdate;
  this.matchYear = $routeParams.matchyear;
  this.team1code = "";
  this.team2code = "";
  //code block to call the json data based on the year 
  if(this.matchYear == "17"){
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  }
  else{
    this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  }
  //code block to get the json data
  this.loadAllSoccerDatas = function(){
    $http({
      method:'GET',
      url:main.baseUrl
    }).then(function successCallback(response){
      //on success this code block will be executed
      for(var teamInfo in response.data.rounds){
        for(var teamMatchesInfo in response.data.rounds[teamInfo].matches){
          //code block to validate the passed single team code
            if(response.data.rounds[teamInfo].matches[teamMatchesInfo].team1.code == main.team1 
            && response.data.rounds[teamInfo].matches[teamMatchesInfo].team2.code == main.team2
            && response.data.rounds[teamInfo].matches[teamMatchesInfo].date == main.matchDate){
              //code block to get and set the team name, date, etc., from json data
              main.team1 = response.data.rounds[teamInfo].matches[teamMatchesInfo].team1.name;
              main.team2 = response.data.rounds[teamInfo].matches[teamMatchesInfo].team2.name;
              main.Goal1 = response.data.rounds[teamInfo].matches[teamMatchesInfo].score1;
              main.Goal2 = response.data.rounds[teamInfo].matches[teamMatchesInfo].score2;
              main.matchDate = response.data.rounds[teamInfo].matches[teamMatchesInfo].date;
              main.soccerSeriesName = response.data.name;
              main.soccerDay = response.data.rounds[teamInfo].name;
              main.team1code = response.data.rounds[teamInfo].matches[teamMatchesInfo].team1.code;
              main.team2code = response.data.rounds[teamInfo].matches[teamMatchesInfo].team2.code;
          }
        }
      }
    }, function errorCallback(response){
      //on error call this function
      alert("some error occurred. Check the console.");
    });
  };
}]);

//Controller for Team Statitics
mySoccer.controller('AllMatches',[ '$http','$routeParams', '$q', function($http,$routeParams, $q){
  //Declare variables 
  var main = this; 
  this.teamCode = $routeParams.soccerteam1;
  this.string2K15 = "2015";
  this.string2K16 = "2017";
  this.teamName = "";
  this.totalMatchesPlayed = 0;
  this.totalWon = 0;
  this.totalLost = 0;
  this.totalDrawn = 0;
  this.totalGoals = 0;
  this.totalMatchesPlayed2K15 = 0;
  this.totalMatchesWon2K15 = 0;
  this.totalMatchesLost2K15 = 0;
  this.totalMatchesDrawn2K15 = 0;
  this.totalGoals2K15 = 0;
  this.totalMatchesPlayed2K16 = 0;
  this.totalMatchesWon2K16 = 0;
  this.totalMatchesLost2K16 = 0;
  this.totalMatchesDrawn2K16 = 0;
  this.totalGoals2K16 = 0;
  this.teams = [];
  this.i = 0;
  this.teamNamebyWon = [];
  this.teamNamebyGoal = [];
  this.count = 0;
  this.count1 = 0;
  this.totalMatchesGoals = 0;
  //code block to get both the JSON data
  this.getAllTheMacthes = function(){ 
    var promise1 = 
      $http({
          method: 'GET', 
          url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', 
          cache: 'true'
        }); 
    var promise2 = 
      $http({
        method: 'GET', 
        url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', 
        cache: 'true'
      }); 
      //code block to set the year separation by appending the year in the name
    $q.all([promise1, promise2]).then(function(response){ 
      for (var i in response[0].data.rounds) { 
        response[0].data.rounds[i].name = response[0].data.rounds[i].name+'(2015)';  
      } 
      for (var i in response[1].data.rounds) { 
        response[1].data.rounds[i].name = response[1].data.rounds[i].name+'(2017)';  
      } 
      //allMatches contains the entire JSON data from both URL
      main.allMatches = response[0].data.rounds.concat(response[1].data.rounds); 
      for(var allmatch in main.allMatches){
        for(var matchdetail in main.allMatches[allmatch].matches){
          //code block to verify whether team1 or team2 is the team we selected
          //start if
          if(main.allMatches[allmatch].matches[matchdetail].team1.code == main.teamCode){
            //Set the team name
            main.teamName = main.allMatches[allmatch].matches[matchdetail].team1.name;
            //Matches played
            main.totalMatchesPlayed = main.totalMatchesPlayed + 1;
            //code block to identify whether the match is played on 2015 or 2016
            if(main.allMatches[allmatch].name.includes(main.string2K15)){
              main.totalMatchesPlayed2K15 += 1;
            }
            else if(main.allMatches[allmatch].name.includes(main.string2K16)){
              main.totalMatchesPlayed2K16 += 1;
            }
            //Matches Won
            if(main.allMatches[allmatch].matches[matchdetail].score1 > 
            main.allMatches[allmatch].matches[matchdetail].score2){
              //Total match won
              main.totalWon = main.totalWon + 1;
              //code block to identify whether the match won is on 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string2K15)){
                main.totalMatchesWon2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesWon2K16 += 1;
              }
            }
            //Matches Lost
            else if(main.allMatches[allmatch].matches[matchdetail].score1 < 
            main.allMatches[allmatch].matches[matchdetail].score2){
              //Total match lost
              main.totalLost = main.totalLost + 1;
              //code block to identify whether the match lost is on 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string2K15)){
                main.totalMatchesLost2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesLost2K16 += 1;
              }
            }
            //Matches drawn
            else{
              //Total matches drawn
              main.totalDrawn = main.totalDrawn + 1;
              //code block to identify whether the match drawn on is on 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string2K15)){
                main.totalMatchesDrawn2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesDrawn2K16 += 1;
              }
            }
            //code block to identify total Goals
            main.totalGoals += main.allMatches[allmatch].matches[matchdetail].score1;
            //code block to identify whether the Goal is scored on 2015 or 2016
            if(main.allMatches[allmatch].name.includes(main.string2K15)){
              main.totalGoals2K15 += main.allMatches[allmatch].matches[matchdetail].score1;
            }
            else if(main.allMatches[allmatch].name.includes(main.string2K16)){
              main.totalGoals2K16 += main.allMatches[allmatch].matches[matchdetail].score1;
            }
          }
          //code block to verify whether team1 or team2 is the team we selected
          //else if
          else if(main.allMatches[allmatch].matches[matchdetail].team2.code == main.teamCode){
            //code block to calculate total matches played
            main.totalMatchesPlayed = main.totalMatchesPlayed + 1;
            //code block to calculate total matches played in 2015 or 2016
            if(main.allMatches[allmatch].name.includes(main.string2K15)){
              main.totalMatchesPlayed2K15 += 1;
            }
            else if(main.allMatches[allmatch].name.includes(main.string2K16)){
              main.totalMatchesPlayed2K16 += 1;
            }
            //code block to calculate total matches Won
            if(main.allMatches[allmatch].matches[matchdetail].score2 > 
            main.allMatches[allmatch].matches[matchdetail].score1){
              main.totalWon = main.totalWon + 1;
              //code block to calculate total matches Won in 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string2K15)){
                 main.totalMatchesWon2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesWon2K16 += 1;
              }
            }
            //code block to calculate total matches Lost
            else if(main.allMatches[allmatch].matches[matchdetail].score2 < 
              main.allMatches[allmatch].matches[matchdetail].score1){
              main.totalLost = main.totalLost + 1;
              //code block to calculate total matches Lost in 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string2K15)){
                 main.totalMatchesLost2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesLost2K16 += 1;
              }
            }
            //code block to calculate total matches drawn
            else{
              main.totalDrawn = main.totalDrawn + 1;
              //code block to calculate total matches drawn in 2015 or 2016
              if(main.allMatches[allmatch].name.includes(main.string)){
                 main.totalMatchesDrawn2K15 += 1;
              }
              else if(main.allMatches[allmatch].name.includes(main.string2K16)){
                main.totalMatchesDrawn2K16 += 1;
              }
            }
            //code block to calculate total Goals
            main.totalGoals += main.allMatches[allmatch].matches[matchdetail].score2;
            //code block to calculate total Goals in 2015 or 2016
            if(main.allMatches[allmatch].name.includes(main.string2K15)){
              main.totalGoals2K15 += main.allMatches[allmatch].matches[matchdetail].score2;
            }
            else if(main.allMatches[allmatch].name.includes(main.string2K16)){
              main.totalGoals2K16 += main.allMatches[allmatch].matches[matchdetail].score2;
            }
          }
          //end if
          //Get the team List
          alreadyPresent = 0;
          main.teams.map(function(teamName){
            // To check whether the team name is already present in the array
            if(main.allMatches[allmatch].matches[matchdetail].team1.code == teamName){
              alreadyPresent = 1;
            }
          });
          // Add if it is a new team
          if(alreadyPresent == 0){
            //Add team into the array
            main.teams[main.i++] = main.allMatches[allmatch].matches[matchdetail].team1.code;
          }
        }
      }
      var allTeam = [];
      currentTeamName = "";
      //Loop teams
      main.teams.map(function(teamName){
        main.totalMatchesPlayedteams = 0;
        main.totalWonteam = 0;
        main.totalMatchesGoals = 0;
        //Loop all Matches
        for(var allmatch in main.allMatches){
          for(var matchdetail in main.allMatches[allmatch].matches){
            //code block to calculate the no of matches won
            //if part to verify whether it is team1 of JSON DATA or team2 of JSON DATA
            //start if
            if(main.allMatches[allmatch].matches[matchdetail].team1.code == teamName){
              //Matches played and Won calculation if the selected team is team1
              currentTeamName = main.allMatches[allmatch].matches[matchdetail].team1.name;
              main.totalMatchesPlayedteams = main.totalMatchesPlayedteams + 1;
              main.totalMatchesGoals += main.allMatches[allmatch].matches[matchdetail].score1;
              if(main.allMatches[allmatch].matches[matchdetail].score1 > 
              main.allMatches[allmatch].matches[matchdetail].score2){
                main.totalWonteam = main.totalWonteam + 1;
              }
            }
            //else part
            else if(main.allMatches[allmatch].matches[matchdetail].team2.code == teamName){
              //Matches played and Won calculation if the selected team is team2
              currentTeamName = main.allMatches[allmatch].matches[matchdetail].team2.name;
              main.totalMatchesGoals += main.allMatches[allmatch].matches[matchdetail].score2;
              main.totalMatchesPlayedteams = main.totalMatchesPlayedteams + 1;
              if(main.allMatches[allmatch].matches[matchdetail].score1 < 
              main.allMatches[allmatch].matches[matchdetail].score2){
                main.totalWonteam = main.totalWonteam + 1;
              }
            }
            //end if
          }
        }
        //Add team name, no.of matches won and no.of Goals
        allTeam.push({"Name":currentTeamName,"Count":Math.round(main.totalWonteam*100/main.totalMatchesPlayedteams),"Goals":main.totalMatchesGoals});
      });
      //sort by team in descending order based on no.of matches won
      TeambyWin = allTeam.sort(function(a,b){
        return b.Count - a.Count;
      });
      //put the sorted data object into an array
      TeambyWin.map(function(teamName){
        main.teamNamebyWon[main.count++] = teamName["Name"];
      });
      //sort by team in descending order based on no.of goal
      TeambyGoal = allTeam.sort(function(a,b){
        return b.Goals - a.Goals;
      });
      //put the sorted data object into an array
      TeambyGoal.map(function(teamName){
        main.teamNamebyGoal[main.count1++] = teamName["Name"];
      });
      main.totalWonPercentage = Math.round(main.totalWon*100/main.totalMatchesPlayed);
      main.totalLostPercentage = Math.round(main.totalLost*100/main.totalMatchesPlayed);
      main.totalDrawnPercentage = 100 - (main.totalWonPercentage+main.totalLostPercentage);
    });
  };
}]);