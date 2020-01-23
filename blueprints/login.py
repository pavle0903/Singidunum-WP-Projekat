import flask
from flask import Blueprint

from utils.db import mysql

login_blueprint = Blueprint("login_blueprint", __name__)

# Funkcija za logi prvo proverava da li korisnik
# postoji u bazi podataka, ukoliko postoji pravi
# se nova sesija u koju se dodaju podaci o korisniku.
@login_blueprint.route("/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnici WHERE brojLicne=%(brojLicne)s AND lozinka=%(lozinka)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        flask.session["korisnik"] = korisnik["id"] # Dodavanje podataka o korisniku u sesiju.
        flask.session["admin"] = korisnik["admin"]
        return "", 200
    else:
        return "", 404

@login_blueprint.route("/logout", methods=["GET"])
def logout():
    flask.session.pop("korisnik", None) # Odjava sa sistema vrsi se uklanjanjem korisnika iz sesije.
    flask.session.pop("admin", None)
    return "", 200

# Funkcija kojom se dobavlja trenutno ulogovani korisnik.
# Moze se prosiriti da dobavi sve podatke korisnik iz baze podataka.
@login_blueprint.route("/currentUser", methods=["GET"])
def current_user():
    return flask.jsonify(flask.session.get("korisnik")), 200

@login_blueprint.route("/getAdminId", methods=["GET"])
def get_admin():
    return flask.jsonify(flask.session.get("admin")), 200