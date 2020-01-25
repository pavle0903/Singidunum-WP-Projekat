import flask
from flask.blueprints import Blueprint

from utils.db import mysql

korisnici_blueprint = Blueprint("korisnici_blueprint", __name__)

@korisnici_blueprint.route("/korisniciAdmini", methods=["GET"])
def dobavi_korisnikeAdmine():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT id FROM korisnici WHERE admin = 1")
    korisniciAdmini = cursor.fetchall()
    return flask.jsonify(korisniciAdmini)

@korisnici_blueprint.route("/korisnici", methods=["GET"])
def dobavi_korisnike():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM korisnici")
    korisnici = cursor.fetchall() 
    return flask.jsonify(korisnici)

@korisnici_blueprint.route("/korisnici/<int:id_korisnika>")
def dobavi_korisnika(id_korisnika, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnici WHERE id=%s", (id_korisnika,))
    korisnik = cursor.fetchone() # Kako je rezultat upita samo jedna torka dovoljno je
                                 # pozvati metodu fetchone() nad kursorom koja vraca
                                 # sledecu torku koja zadovoljava upit.
    if korisnik is not None:
        return flask.jsonify(korisnik) # Ukoliko je pronadje, proizvod se prosledjuje klijentu.
    else:
        return "", 404 # Ukoliko proizvod nije pronadjen klijent ce dobiti status odgovora 404.
                       # Odnosno podatak da trazeni resurs nije pronadjen.

@korisnici_blueprint.route("/korisnici", methods=["POST"])
def dodaj_korisnika():
    db = mysql.get_db() # Dobavljanje instance konekcije ka bazi.
    cursor = db.cursor() # Dobavljanje kursora.

    cursor.execute("INSERT INTO korisnici(ime, prezime, brojLicne, lozinka, admin) VALUES(%(ime)s, %(prezime)s, %(brojLicne)s, %(lozinka)s, %(admin)s)", flask.request.json)

    db.commit()
    return flask.jsonify(flask.request.json), 201 # Status kod 201 oznacava uspesno kreiran resurs.

@korisnici_blueprint.route("/korisnici/<int:id_korisnika>", methods=["DELETE"])
def ukloni_korisnika(id_korisnika):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnici WHERE id=%s", (id_korisnika,))
    db.commit()
    return "", 204 # Operacija je uspesna ali je telo odgovora prazno.

@korisnici_blueprint.route("/akorisnik/<int:id_korisnika>", methods=["PUT"])
def izmeni_korisnika(id_korisnika):
    db = mysql.get_db()
    cursor = db.cursor()
    # data = flask.request.json
    cursor.execute("SELECT * FROM korisnici where id=%s", (id_korisnika,))
    korisnik = cursor.fetchone()
    if korisnik["admin"] == 0:
        cursor.execute("UPDATE korisnici SET admin = 1 WHERE id=%s", (id_korisnika,))
    else:
        cursor.execute("UPDATE korisnici SET admin = 0 WHERE id=%s", (id_korisnika,))
    db.commit()
    return "", 200