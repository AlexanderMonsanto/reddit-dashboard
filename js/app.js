var redditApp = angular.module('RedditApp',[]);

redditApp.run(function(){
  console.log('this file is running.');
})

redditApp.controller('RedditSearch',['$scope','$http',function($scope, $http){
  $scope.searchWord = ""
  $scope.searchHistory = JSON.parse(window.localStorage.searchHistory || "[]");

  $scope.search = function(){

    var req = {
      url: "http://www.reddit.com/search.json?",
      params: {
        q: $scope.searchWord
      }
    }

    $http(req).success(function(data){
      $scope.posts = data.data.children
      $scope.searchHistory.push($scope.searchWord)
      window.localStorage.searchHistory = JSON.stringify($scope.searchHistory)
    })
  }

  $scope.research = function(idx){

    var req = {
      url: "http://www.reddit.com/search.json?",
      params: {
        q: $scope.searchHistory[idx]
      }
    }

    $http(req).success(function(data){
      $scope.posts = data.data.children
    })
  }

  $scope.delete = function(index){
    $scope.searchHistory.splice(index,1)
    window.localStorage.searchHistory = JSON.stringify($scope.searchHistory)
  }

}]);


