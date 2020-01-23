(function(angular){
    var app = angular.module("app");

    app.controller("loginCtrl", ["$http", "$scope","$rootScope", "$state", "$location", function($http, $scope, $rootScope, $state, $location){
        var that = this;
        this.status = "neprijavljen"; // Pocetni status prijave.
        this.korisnikID;
        this.statusAdmina = "ne";
        this.korisniciAdmini;
        this.korisnik = {
            brojLicne: "",
            lozinka: "",
        }

        this.login = function() {
            $http.post("api/login", this.korisnik).then(
                function(response) {
                    that.status = "prijavljen";
                    // that.korisnikID = this.korisnik.id;
                    // console.log(this.korisnikID);
                    alert("Korisnik uspešno prijavljen.");
                    window.location.reload();
                    // Praznjenje polja sa podacima korisnika.
                    that.korisnik = {
                        brojLicne: "",
                        lozinka: ""
                    }
                },
                function(reason) {
                    that.status = "neuspesno";
                    alert("Korisnik sa zadatim podacima nije pronađen. Pokušajte ponovo.");
                    // Praznjenje polja sa podacima korisnika.
                    that.korisnik = {
                        brojLicne: "",
                        lozinka: ""
                    }
                }
            )
        }

        this.logout = function() {
            $http.get("api/logout").then(
                function(response) {
                    that.status = "neprijavljen";
                    that.statusAdmina = "ne";
                    window.location.reload()
                    $state.go('smestaji')
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }
        this.dobaviAdmina = function(){
            $http.get("api/getAdminId").then(
                function(response){ 
                    //console.log(response);
                    if(response.data == 1){
                        that.statusAdmina = "da";
                    }
                    else {
                        that.statusAdmina = "ne";
                    }
                    console.log(response.data);
                }
            )
        }
        this.getCurrentUser = function() {
            $http.get("api/currentUser").then(
                function(response) {
                    if(response.data) {
                        that.status = "prijavljen";
                    } else {
                        that.status = "neprijavljen";
                    }
                    console.log(response.data);
                    this.korisnikID = (response.data);
                    console.log(korisnikID);
                    console.log(korisnici);
                    
                },
                function(reason) {
                    console.log(reason[0].ime); //ime
                }
            )
        }

        // this.getAdminId = function() {
        //     $http.get("api/getAdminId").then(
        //         function(response) {
        //             this.korisniciAdmini = (response.data);
        //             console.log(response.data);
        //             //console.log(korisniciAdmini);
        //             // this.korisnikID = (response.data);
        //             // console.log(korisnikID);
        //             // console.log(korisnici);
                    
        //         },
        //         function(reason) {
        //             console.log(reason[0].ime); //ime
        //         }
        //     )
        // }
        this.getCurrentUser(); // Provera da li je korisnik vec prijavljen.
        //this.getAdminId();
        this.dobaviAdmina();
    }]);
})(angular);