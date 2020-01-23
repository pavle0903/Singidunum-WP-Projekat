(function (angular) {
    var app = angular.module("app");
    app.controller("SmestajFormaCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        this.kategorije = []; // Inicijalno kategorije nisu dobavljene.
        // Inicijalno podaci o novom proizvodu su popunjeni podrazumevanim vrednostima.
        this.noviSmestaj = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "kategorija": null,
            "raspolozivost": 0,
            "rezervacija": 1
        };

        // Funkcija za dobavljanje svih kategorija.
        this.dobaviKategorije = function() {
            // Upucuje se get zahtev na relativni URL api/kategorije.
            $http.get("api/kategorije").then(function(result){
                // Ukoliko server uspesno obradi zahtev i vrati odgovor
                // rezultat se nalazi u promenljivoj result.
                console.log(result);
                // Isparsirano telo odgovora je smesteno u promenljivu data
                // u result objektu.
                that.kategorije = result.data;
                // Incijalizacija kategorije u novom proizvodu
                // na prvu dobavljenu kategoriju.
                if(!$stateParams["id"]) {
                    that.noviSmestaj.kategorija = that.kategorije[0].id;
                }
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.dobaviSmestaj = function(id) {
            $http.get("api/smestaji/" + id).then(function(result){
                that.noviSmestaj = result.data;
                that.noviSmestaj["kategorija"] = that.noviSmestaj["kategorija_id"];
            }, function(reason) {
                console.log(reason);
            });
        }

        this.dodajSmestaj = function () {

            $http.post("api/smestaji", this.noviSmestaj).then(function (response) {
                console.log(response);

                $state.go("smestaji")
            }, function (reason) {
                console.log(reason);
            });
        }

        this.izmeniSmestaj = function(id) {
            $http.put("api/smestaji/" + id, that.noviSmestaj).then(function(response) {
                console.log(response)

                $state.go("smestaj", {"id": id});
            }, function(reason) {
                console.log(reason);
            });
        }

        this.sacuvaj = function() {
            if($stateParams["id"]) {
                this.izmeniSmestaj($stateParams["id"], that.smestaj);
            } else {
                this.dodajSmestaj();
            }
        }

        this.dobaviKategorije();
        if($stateParams["id"]) {
            this.dobaviSmestaj($stateParams["id"]);
        }
    }]);
})(angular);