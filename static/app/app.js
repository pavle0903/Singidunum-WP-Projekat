(function(angular){
    // Kreiranje modula pod nazivom app koji kao zavisnost ima ui router modul.
    // U slucaju da je modul vec kreiran, umesto kreiranja novog, bice
    // dobavljen postojeci modul.
    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

    app.config(['$qProvider', function ($qProvider) {  
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    })


    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        // Stanje se registruje preko $stateProvider servisa, pozivom
        // metode state kojoj se prosledjuje state objekat.
        $stateProvider.state({
            name: "home", // Naziv stanja, mora biti zadat.
            url: "/", // URL kojim se prelazi na zadato stanje.
            templateUrl: "app/components/smestaji/smestaji.tpl.html", // URL do sablona koji se koristi za zadato stanje.
            controller: "SmestajiCtrl", // Kontroler koji se vezuje za sablon u zadatom stanju.
            controllerAs: "sctrl" // Naziv vezanog kontrolera.
        }).state({
            name: "dodavanjeSmestaja",
            url: "/SmestajForma",
            templateUrl: "app/components/smestajForma/smestajForma.tpl.html",
            controller: "SmestajFormaCtrl",
            controllerAs: "sctrl"
        }).state({
            name: "smestaji",
            url: "/smestaji",
            templateUrl: "app/components/smestaji/smestaji.tpl.html",
            controller: "SmestajiCtrl",
            controllerAs: "sctrl"
        }).state({
            name: "smestaj",
            url: "/smestaji/{id}", // Ovaj URL je razlicit od URL-a za pristup svim smestajima
                                    // jer sadrzi parametar id. Samo ukoliko se navede i parametar
                                    // dolazi do poklapanja sa ovim URL-om i do aktiviranja stanja.
            templateUrl: "app/components/smestaj/smestaj.tpl.html",
            controller: "SmestajCtrl",
            controllerAs: "sctrl"
        }).state({
            name: "izmenaSmestaja",
            url: "/smestajForma/{id}",
            templateUrl: "app/components/smestajForma/smestajForma.tpl.html",
            controller: "SmestajFormaCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "sctrl"
        }).state({
            name: "registracija",
            url: "/registracija",
            templateUrl: "app/components/registracija/registracija.tpl.html",
            controller: "RegistracijaCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "rctrl",
        }).state({
            name: "korisnici",
            url: "/korisnici",
            templateUrl: "app/components/korisnici/korisnici.tpl.html",
            controller: "KorisniciCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "kctrl"
        }).state({
            name: "login",
            url: "/login",
            templateUrl: "app/components/loginForma/loginForma.tpl.html",
            controller: "loginCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "lctrl"
        }).state({
            name: "rezervacija",
            url: "/rezervacija/{id}",
            templateUrl: "app/components/rezervacija/rezervacija.tpl.html",
            controller: "RezervacijaCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "rctrl"
        }).state({
            name: "rezervacije",
            url: "/rezervacija",
            templateUrl: "app/components/rezervacija/rezervacije.tpl.html",
            controller: "RezervacijaCtrl",
            controllerAs: "rctrl"
        }).state({
            name: "sveRezervacije",
            url: "/rezervacije",
            templateUrl: "app/components/sveRezervacije/sveRezervacije.tpl.html",
            controller: "sveRezervacijeCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "srctrl"
        });

        // Ukoliko zadati url ne pokazuje ni na jedno stanje
        // vrsi se preusmeravajne na url zadat pozivom metode
        // otherwise nad $urlRouterProvider servisom.
        $urlRouterProvider.otherwise("/")
    }]);
    app.run(function ($rootScope, $location) {
        $rootScope.location = $location;
    })
})(angular);

