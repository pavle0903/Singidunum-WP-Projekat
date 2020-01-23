(function(angular){
    var app = angular.module("app");
    // U kontroler se pored $http servisa umece i $stateParams servis.
    // Servis $stateParams se koristi za pristup vrednostima parametara
    // parametrizovanih URL-ova. Vrednostima se pristupa preko kljuca
    // pri cemu kljuc odogavara imenu parametra navdenom prilikom
    // konfigurisanja stanja ui router komponente.
    app.controller("SmestajCtrl", ["$http", "$stateParams", function($http, $stateParams) {
        var that = this;
        this.smestaj = {};

        this.dobaviSmestaj = function(id) {
            $http.get("api/smestaji/" + id).then(function(result){
                that.smestaj = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        // Iz $stateParams se preuzima vrednost na kljucu id, koja odgovara
        // vrednosti primarnog kljuca trazenog smestaja.
        this.dobaviSmestaj($stateParams["id"]);
    }]);
})(angular)