import flask
from flask.blueprints import Blueprint
from datetime import date

from utils.db import mysql

# Blueprint predstavlja komponentu aplikacije koja se
# moze koristiti vise puta. Sluzi za jednostavniju i
# jasniju organizaciju aplikacija u logicke celine.
# Blueprint se instancira kao i aplikacija.
# Prvo se navodi naziv blueprinta, a potom naziv
# modula u kojem se blueprint nalazi.
rezervacija_blueprint = Blueprint("rezervacija_blueprint", __name__)

@rezervacija_blueprint.route("/rezervacija", methods=["GET"])
def dobavi_smestaje():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM smestaj") 

    smestaji = cursor.fetchall() 
    return flask.jsonify(smestaji) 

@rezervacija_blueprint.route("/rezervacija/<int:id_smestaja>")
def dobavi_smestaj(id_smestaja, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM smestaj WHERE id=%s", (id_smestaja,))
    smestaj = cursor.fetchone() # Kako je rezultat upita samo jedna torka dovoljno je
                                 # pozvati metodu fetchone() nad kursorom koja vraca
                                 # sledecu torku koja zadovoljava upit.
    if smestaj is not None:
        return flask.jsonify(smestaj) # Ukoliko je pronadje, proizvod se prosledjuje klijentu.
    else:
        return "", 404 # Ukoliko proizvod nije pronadjen klijent ce dobiti status odgovora 404.
                       # Odnosno podatak da trazeni resurs nije pronadjen.

@rezervacija_blueprint.route("/rezervacijaa/<int:id_korisnika>", methods=["GET"])
def dobavi_rezervacije(id_korisnika):
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM rezervacije WHERE korisnici_id=%s", (id_korisnika, )) 

    rezervacije = cursor.fetchall() 
    return flask.jsonify(rezervacije)

@rezervacija_blueprint.route("/rezervacije", methods=["GET"])
def dobavi_sverezervacije():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM rezervacije") 

    sveRezervacije = cursor.fetchall() 
    return flask.jsonify(sveRezervacije) 

@rezervacija_blueprint.route("/rezervacija", methods=["POST"])
def dodaj_rezervaciju():
    db = mysql.get_db() # Dobavljanje instance konekcije ka bazi.
    cursor = db.cursor() # Dobavljanje kursora.
    data = flask.request.json
    data["datumDolaska"] = data["datumDolaska"].rstrip("Z")
    data["datumOdlaska"] = data["datumOdlaska"].rstrip("Z")
    
    cursor.execute("SELECT * FROM smestaj WHERE id=%s", data["smestaj_id"])
    smestaj = cursor.fetchone()
    danasnji = date.today
    if data["datumOdlaska"] == danasnji:
        cursor.execute("UPDATE smestaj SET raspolozivost=raspolozivost+1 WHERE id=%s", data["smestaj_id"])

    if smestaj["raspolozivost"] > 0:

        cursor.execute("INSERT INTO rezervacije(datumDolaska, datumOdlaska, korisnici_id, smestaj_id) VALUES(%(datumDolaska)s, %(datumOdlaska)s, %(korisnici_id)s, %(smestaj_id)s)", flask.request.json)
        cursor.execute("UPDATE smestaj SET raspolozivost=raspolozivost-1 WHERE id=%s", data["smestaj_id"])
        db.commit()
    else:
        print("Nema raspolozivih jedinica za odabrani smestaj!")
        return "", 204
    return flask.jsonify(flask.request.json), 201 # Status kod 201 oznacava uspesno kreiran resurs.

@rezervacija_blueprint.route("/rezervacija/<int:id_rezervacije>", methods=["DELETE"])
def ukloni_rezervaciju(id_rezervacije):
    db = mysql.get_db()
    cursor = db.cursor()
    #data = flask.request.json
    cursor.execute("SELECT * FROM rezervacije WHERE id=%s", id_rezervacije)
    smestajid = cursor.fetchone()
    cursor.execute("DELETE FROM rezervacije WHERE id=%s", (id_rezervacije,))
    cursor.execute("UPDATE smestaj SET raspolozivost=raspolozivost+1 WHERE id=%s", smestajid["smestaj_id"]) #ne radi ti ovo, dovrsi
    db.commit()
    return "", 204 # Operacija je uspesna ali je telo odgovora prazno.