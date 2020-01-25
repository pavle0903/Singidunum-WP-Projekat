(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("app");

    app.controller("KorisniciCtrl", ["$http", "$scope", function($http, $scope) {
        var that = this; 

        this.korisnici = []; 
        
        $scope.pageSize = 5;
        $scope.currentPage = 1;

        this.dobaviKorisnike = function() {
            $http.get("api/korisnici").then(function(result){
                console.log(result);
                that.korisnici = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.ukloniKorisnika = function(id) {

            $http.delete("api/korisnici/" + id).then(function(response){
                console.log(response);
                that.dobaviKorisnike();
            },
            function(reason){
                console.log(reason);
            });
        }
        this.izmeniKorisnika = function(id) {
            $http.put("api/akorisnik/" + id).then(function(response){
                
                console.log(response);
                that.dobaviKorisnike();
            },
            function(reason){
                alert("Nije uspelo!")
                console.log(result);
            });
        }
        this.dobaviKorisnike();
    }]);
})(angular);