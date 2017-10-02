

//myService=app.factory('myService', function() {
//    var savedData = {}
//    function set(data) {
//        savedData = data;
//    }
//    function get() {
//        return savedData;
//    }

//    return {
//        set: set,
//        get: get
//    }

//});


angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal,$window, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);


    var data = 'userName=' + $scope.loginData.username + "&password=" + $scope.loginData.password

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    $http.post('http://faridheydari.ir/webService/login.php', data, config)
    .success(function (data, status, headers, config) {
        
     if(data.result==1){
        localStorage.setItem('user', $scope.loginData.username);
        $scope.closeLogin();
        alert(localStorage.getItem('user'))
        $window.location.href = '/index.html';
     } else {
         alert(data.message)

  }

    })
    .error(function (data, status, header, config) {
        alert('error!')
    });


  };
})

.controller('PlaylistsCtrl', function ($scope,$http) {


    $http.get("http://faridheydari.ir/webService/getPosts.php")
        .success(function (response) {
            $scope.playlists = response;
        })
        .error(function (response) {
            $scope.message = "Error";
        });
  //$scope.playlists = [
  //  { title: 'Reggae', id: 1 },
  //  { title: 'Chill', id: 2 },
  //  { title: 'Dubstep', id: 3 },
  //  { title: 'Indie', id: 4 },
  //  { title: 'Rap', id: 5 },
  //  { title: 'Cowbell', id: 6 },
  //  { title: 'farid', id: 7 }
  //];
    $scope.click = function (id) {
        //myService.set(id);
           // alert("hellloooo!!"+id)
            
        }
        $scope.newPage = function () {

        }
})
.controller('NewPageCtrl', function ($scope) {
    //alert("hekkkklew")

})
.controller('MenuCtrl', function ($scope) {
    $scope.currentUser = localStorage.getItem('user')

})
.controller('TagCtrl', function ($scope) {
    localStorage.setItem('tag',$scope.tag)

})

.controller('PlaylistCtrl', function ($scope, $stateParams,$http) {


    var data = 'id=' + $stateParams.playlistId

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    $http.post('http://faridheydari.ir/webService/getPostByID.php', data, config)
    .success(function (data, status, headers, config) {
        $scope.knowledge = data[0]
        
        
    })
    .error(function (data, status, header, config) {
        alert('error!')
    });




    $scope.id = $stateParams.playlistId;
});
