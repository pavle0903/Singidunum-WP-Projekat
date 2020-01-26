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
                //window.location.reload()


            },
            function(reason) {
                console.log(reason);
            });
        }
        this.ukloniRezervaciju = function(id) {

            $http.delete("api/arezervacija/" + id).then(function(response){
                alert("Uspesno ste otkazali rezervaciju!")
                console.log(response);
                that.dobaviRezervacije();
            },
            function(reason){
                console.log(reason);
                alert("Ne mozes!")
            });
        }

        this.dobaviRezervacije();
    }]);
})(angular);