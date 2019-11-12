import os
from flask import Flask, request, abort, jsonify, render_template, \
    Response, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
from models import *


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    #TODO: Define endpoints to:

    # GET /actors and /movies
    @app.route('/actors', methods=['GET'])
    def function():
      actors = Actors.query.all()
      
      return jsonify{(...)}

    # DELETE / actors / and / movies/
    # POST / actors and / movies and
    # PATCH / actors / and / movies/


  ''' @app.route('/endpoint', methods=['GET'])
      def function():
      ...
      return jsonify{(...)}
  '''

  return app


APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=8080, debug=True)
