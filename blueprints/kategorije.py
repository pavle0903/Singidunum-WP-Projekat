import flask
from flask.blueprints import Blueprint

from utils.db import mysql

kategorije_blueprint = Blueprint("kategorije_blueprint", __name__)

@kategorije_blueprint.route("/kategorije", methods=["GET"])
def dobavi_kategorije():
    cursor = mysql.get_db().cursor() 
    cursor.execute("SELECT * FROM kategorija") 
    kategorije = cursor.fetchall() 
    return flask.jsonify(kategorije)