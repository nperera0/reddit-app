var services = angular.module('services', []);

services.factory('RedditService', ['$http',
  function($http){
    function Reddit(){};

    Reddit.domain = 'http://www.reddit.com';

    Reddit.top = function(){
      var path = '/top.json';
      var url = Reddit.domain + path;

      return $http.get(url)
        .then(function(response){
          return response.data.data.children;
        });
    };

    Reddit.comments = function(params){
  var path = '/r/' + params.subreddit +
             '/comments/' + params.id +
             '/' + params.slug + '.json';

  var url = Reddit.domain + path;

  return $http.get(url)
    .then(function(response){
      return response.data[1].data.children;
    });
};

    return Reddit;
  }
]);
