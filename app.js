var redditApp = angular.module('RedditApp', ['ngRoute','services']);

redditApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'templates/home.html',
        controller : 'HomeCtrl',
        controllerAs : 'home'
      })
      .when('/r/:subreddit/comments/:id/:slug/', {
        templateUrl : 'templates/comments.html',
        controller : 'CommentsCtrl',
        controllerAs : 'cmnts'
      })
      .otherwise('/');
  }
]);

redditApp.controller('HomeCtrl', [ 'RedditService',
  function(RedditService){

    RedditService.top()
      .then(function(stories){
        this.stories = stories;
      }.bind(this));

  }
]);

redditApp.controller('CommentsCtrl', ['$routeParams', 'RedditService',
  function($routeParams, RedditService){
    this.params = $routeParams;

    RedditService.comments($routeParams)
      .then(function(comments){
        this.comments = comments;
      }.bind(this));
  }
]);
