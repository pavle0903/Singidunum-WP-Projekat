(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("app");

    app.controller("sveRezervacijeCtrl", ["$http", "$scope", function($http, $scope) {
        var that = this;

        this.sveRezervacije = [];
        

        this.dobaviRezervacije = function() {
            $http.get("api/rezervacije").then(function(result){
                console.log(result);

                that.sveRezervacije = (result.data)


            },
            function(reason) {
                console.log(reason);
            });
        }

        this.dobaviRezervacije();
    }]);
})(angular);