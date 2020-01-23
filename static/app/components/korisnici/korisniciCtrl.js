(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("app");

    app.controller("KorisniciCtrl", ["$http", function($http) {
        var that = this; 

        this.korisnici = []; 
        
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
        
        this.dobaviKorisnike();
    }]);
})(angular);