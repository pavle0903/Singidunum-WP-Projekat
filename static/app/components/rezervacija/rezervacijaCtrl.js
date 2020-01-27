(function(angular){
    var app = angular.module("app")

    // U kontroler se pored $http servisa umece i $stateParams servis.
    // Servis $stateParams se koristi za pristup vrednostima parametara
    // parametrizovanih URL-ova. Vrednostima se pristupa preko kljuca
    // pri cemu kljuc odogavara imenu parametra navdenom prilikom
    // konfigurisanja stanja ui router komponente.
    app.controller("RezervacijaCtrl", ["$http", "$state", "$scope", "$stateParams", function($http, $state, $scope, $stateParams) {

        $scope.danasnji = new Date();
        $scope.startdt = new Date();
        $scope.enddt = new Date();
        $scope.enddt.setDate($scope.startdt.getDate() + 2);

        $scope.opened = {
          startdt: false,
          enddt: false
        };

        $scope.open = function($event, picker) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened[picker] = true;
        };
      
        $scope.$watch('startdt', function(newval){
          if (newval > $scope.enddt) {
            $scope.enddt = newval;
          }
        });
          
        $scope.setRangeClass = function(date, mode) {
          if (mode === 'day') {
            var dayToCheck = new Date(date);
            var startDay = new Date($scope.startdt);
            var endDay = new Date($scope.enddt);
            
            if (dayToCheck >= startDay && dayToCheck < endDay) {
              return 'range';
            }
          }
          return '';
        };

        var that = this;
        this.rezervacije = [];
        this.sveRezervacije = [];
        this.korisnikID;
        this.smestaj = {};
        this.odabranSmestaj =[];
        
        this.novaRezervacija = {
            "datumDolaska": $scope.startDate,
            "datumOdlaska": $scope.endDate,
            "korisnici_id": korisnikID,
            "smestaj_id": $stateParams.id
        };
        this.korisnici = [];

        this.dobaviSmestaj = function(id) {
            $http.get("api/rezervacija/" + id).then(function(result){
                that.smestaj = result.data;
                console.log(smestaj)
                // if(!$stateParams["id"]) {
                //     that.novaRezervacija.smestaj_id = that.smestaj[0].id;
                // }
            }, function(reason) {
                console.log(reason);
            });
        }
        this.dobaviRezervacije = function() {
            $http.get("api/rezervacijaa/" + korisnikID).then(function(result){
                console.log(result);
                that.rezervacije = result.data;
                //console.log(rezervacije)
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.Rezervacije = function() {
            $http.get("api/rezervacije").then(function(result){
                console.log(result);
                result.data["datumDolaska"] = new Date(this.novaRezervacija["datumDolaska"]);
                result.data["datumOdlaska"] = new Date(this.novaRezervacija["datumOdlaska"]);
                that.sveRezervacije = result.data;
                console.log(sveRezervacije);
                //console.log(rezervacije)
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.ukloniRezervaciju = function(id) {

          $http.delete("api/rezervacija/" + id).then(function(response){
              alert("Uspesno ste otkazali rezervaciju!")
              console.log(response);
              that.dobaviRezervacije();
          },
          function(reason){
              console.log(reason);
          });
      }

        this.dodajRezervaciju = function () {
        

            // this.novaRezervacija["datumDolaska"] = new Date(this.novaRezervacija["datumDolaska"]);
            // this.novaRezervacija["datumOdlaska"] = new Date(this.novaRezervacija["datumOdlaska"]);



            if(this.novaRezervacija["datumDolaska"] > this.novaRezervacija["datumOdlaska"]){
                alert("Greska u datumu odlaska!")
            }
            else{
                $http.post("api/rezervacija", this.novaRezervacija).then(function (response) {
                    console.log(response);
                    if(that.smestaj.raspolozivost > 0){
                        that.smestaj.raspolozivost -=1;
                        alert("Uspesno ste rezervisali!")
                    }
                    else{
                        alert("Raspolozivost ove sobe je 0")
                    }
                //izmeniSmestaja();
                //$state.go("smestaji")
                }, function (reason) {
                    alert("Izaberite datum!")
                    console.log(reason);
                });
            }
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
              },
              function(reason) {
                  console.log(reason[0].ime);
              }
          )
      }
      this.getCurrentUser(); // Provera da li je korisnik vec prijavljen.


        // Iz $stateParams se preuzima vrednost na kljucu id, koja odgovara
        // vrednosti primarnog kljuca trazenog smestaja.
        this.dobaviRezervacije();
        this.dobaviSmestaj($stateParams["id"]);
        
        
    }]);
})(angular)