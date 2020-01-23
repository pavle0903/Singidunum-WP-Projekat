import flask
import datetime
from flask import Flask

from utils.db import mysql

# Dobavljanje blueprint-ova.
from blueprints.kategorije import kategorije_blueprint
from blueprints.smestaj import smestaji_blueprint
from blueprints.korisnici import korisnici_blueprint
from blueprints.login import login_blueprint
from blueprints.rezervacija import rezervacija_blueprint


app = Flask(__name__, static_url_path="")


app.config["MYSQL_DATABASE_USER"] = "pavle" 
app.config["MYSQL_DATABASE_PASSWORD"] = "123pavle" 
app.config["MYSQL_DATABASE_DB"] = "hotel" 
app.config["SECRET_KEY"] = "ta WJoir29$"


# mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)
 
mysql.init_app(app) 

app.register_blueprint(kategorije_blueprint, url_prefix="/api")
app.register_blueprint(smestaji_blueprint, url_prefix="/api")
app.register_blueprint(korisnici_blueprint, url_prefix="/api")
app.register_blueprint(login_blueprint, url_prefix="/api")
app.register_blueprint(rezervacija_blueprint, url_prefix="/api")

@app.route("/")
@app.route("/index")

def index_page():

    return app.send_static_file("index.html")

#########################################
############ DOBAVLJANJE ################
#########################################


#########################################
############ DODAVANJE ##################
#########################################


#########################################
############## IZMENA ###################
#########################################


#########################################
############# LOGINOVANJE ###############
#########################################

#########################################
############# UKLANJANJE ################
#########################################


if __name__ == "__main__":

    app.run("0.0.0.0", 5000, threaded=True)

