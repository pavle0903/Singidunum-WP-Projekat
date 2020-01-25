(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("app");

    app.controller("SmestajiCtrl", ["$http", "$scope", "$log", function($http, $scope, $log) {
        var that = this;

        this.smestaji = [];
        this.svismestaji = [];

        $scope.pageSize = 6;
        $scope.currentPage = 1;
        

        this.dobaviSmestaje = function() {
            $http.get("api/smestaji").then(function(result){
                console.log(result);

                that.smestaji = (result.data)


            },
            function(reason) {
                console.log(reason);
            });
        }

        this.ukloniSmestaj = function(id) {

            $http.delete("api/smestaji/" + id).then(function(response){
                console.log(response);
                that.dobaviSmestaje();
            },
            function(reason){
                console.log(reason);
                alert("Ne mozete obrisati sobu koja je rezervisana!")
            });
        }
        
        this.dobaviSmestaje();
    }]);
})(angular);