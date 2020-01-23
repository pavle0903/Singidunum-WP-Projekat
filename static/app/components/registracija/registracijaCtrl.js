(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("app");

    app.controller("RegistracijaCtrl", ["$http", "$state", "$location", "$stateParams", function ($http, $state, $location, $stateParams) {
        var that = this; 

        this.korisnici = [];
        this.noviKorisnik = {
            "ime": "",
            "prezime": "",
            "brojLicne": 0,
            "lozinka": "",
            "admin": 0,
        }; 
        
        this.dobaviKorisnike = function() {
            $http.get("api/korisnici").then(function(result){
                console.log(result);
                that.korisnici = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.dodajKorisnika = function () {
            $http.post("api/korisnici", this.noviKorisnik).then(function (response) {
                console.log(response);
                alert("Uspesno ste se registrovali!")
                $state.go("smestaji")
            }, function (reason) {
                alert("Broj licne karte koji ste uneli vec postoji!!!")
                console.log(reason);
            });
        }
        
        this.dobaviKorisnike();
    }]);
})(angular);