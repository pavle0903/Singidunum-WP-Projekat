import flask
from flask.blueprints import Blueprint

from utils.db import mysql

# Blueprint predstavlja komponentu aplikacije koja se
# moze koristiti vise puta. Sluzi za jednostavniju i
# jasniju organizaciju aplikacija u logicke celine.
# Blueprint se instancira kao i aplikacija.
# Prvo se navodi naziv blueprinta, a potom naziv
# modula u kojem se blueprint nalazi.
smestaji_blueprint = Blueprint("smestaji_blueprint", __name__)

@smestaji_blueprint.route("/smestaji", methods=["GET"])
def dobavi_smestaje():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM smestaj") 

    smestaji = cursor.fetchall()
    return flask.jsonify(smestaji) 

@smestaji_blueprint.route("/smestaji/<int:id_smestaja>")
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

@smestaji_blueprint.route("/smestaji", methods=["POST"])
def dodaj_smestaj():
    db = mysql.get_db() # Dobavljanje instance konekcije ka bazi.
    cursor = db.cursor() # Dobavljanje kursora.

    cursor.execute("INSERT INTO smestaj(naziv, opis, raspolozivost, cena, kategorija_id) VALUES(%(naziv)s, %(opis)s, %(raspolozivost)s, %(cena)s, %(kategorija)s)", flask.request.json)

    db.commit()
    return flask.jsonify(flask.request.json), 201 # Status kod 201 oznacava uspesno kreiran resurs.

@smestaji_blueprint.route("/smestaji/<int:id_smestaja>", methods=["PUT"])
def izmeni_smestaj(id_smestaja):
    db = mysql.get_db()
    cursor = db.cursor()
    data = flask.request.json
    data["id"] = id_smestaja # Id proizvoda koji treba azurirati preuzima
                              # se iz vrednosti parametra URL-a.
    cursor.execute("UPDATE smestaj SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, raspolozivost=%(raspolozivost)s, kategorija_id=%(kategorija)s WHERE id=%(id)s", data)
    db.commit()
    return "", 200

@smestaji_blueprint.route("/smestaji/<int:id_smestaja>", methods=["DELETE"])
def ukloni_smestaj(id_smestaja):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM smestaj WHERE id=%s", (id_smestaja,))
    db.commit()
    return "", 204 # Operacija je uspesna ali je telo odgovora prazno.