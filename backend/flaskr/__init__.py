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

    # GET /actors and /movies --> DONE
    @app.route('/actors', methods=['GET'])
    def get_actors():
      actors = Actors.query.all()
      if not actors:
        abort(404)
      return jsonify({"success":True,"Actors":actors})

    @app.route('/movies', methods=['GET'])
    def get_movies():
      movies = Movies.query.all()
      if not movies:
        abort(404)
      return jsonify({"success": True, "Movies": movies})

    # DELETE / actors / and / movies/
    @app.route('/actors/<int:id>', methods=['DELETE'])
    def delete_actor(id):
      actor = Actors.query.get(id)
      if not actor:
        abort(404)
      try:
        actor.delete()
      except Exception:
        abort(401)
      return jsonify({"success": True, "Deleted": actor})

    @app.route('/movies/<int:id>', methods=['DELETE'])
    def delete_movie(id):
      movie = Movies.query.get(id)
      if not movie:
        abort(404)
      try:
        movie.delete()
      except Exception:
        abort(401)
      return jsonify({"success": True, "Deleted": movie})
  
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
