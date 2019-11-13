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

    migrate = Migrate(app, db)


    # GET /actors and /movies --> DONE
    @app.route('/actors', methods=['GET'])
    def get_actors():
        result = actors.query.all()
        print(result)
        if not result:
          abort(404)
        return jsonify({"success":True,"Actors":result})

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
    @app.route('/actors', methods=['POST'])
    def post_actor():
        data = request.get_json()
        if not data:
          abort(400)
        
        new_name = data.get("name")
        new_age = data.get("age")
        new_gender = data.get("gender")

        if not new_name or not new_age or not new_gender:
          abort(400)
        
        # Create a new actor
        new_actor = Actors(name=new_name,age=new_age,gender=new_gender)
        try:
          new_actor.insert()
        except Exception:
          abort(401)
        
        # Query for new actor
        new_actor_id = new_actor.id
        new_actors = Actors.query.get(new_actor_id)
        return jsonify({"success": True, "Deleted": new_actors})

    @app.route('/moviess', methods=['POST'])
    def post_movie():
        data = request.get_json()
        if not data:
          abort(400)
        new_title = data.get("title")
        new_release_date = data.get("release_date")
        if not new_title or not new_release_date:
          abort(400)
        # Create a new movie
        new_movie = Movies(title=new_title, release_date=new_release_date)
        try:
          new_movie.insert()
        except Exception:
          abort(401)
        # Query for new actor
        new_movie_id = new_movie.id
        new_movies = Movies.query.get(new_movie_id)
        return jsonify({"success": True, "Deleted": new_movies})

    # PATCH / actors / and / movies/
    @app.route('/actors/<int:id>', methods=['PATCH'])
    def patch_actor(id):
        # Get actor to patch
        actor = Actors.query.get(id)
        if not actor:
          abort(404)
        # Check what values are available to patch
        data = request.get_json()
        if 'name' in data:
          actor.name = data.get("name")
        if 'age' in data:
          actor.age = data.get("age")
        if 'gender' in data:
          actor.gender = data.get("gender")
        try:
          actor.update()
        except Exception:
          abort(401)
        patched_actor = Actors.query.get(actor.id)
        return jsonify({"success":True,"Actor":patched_actor})
    
    @app.route('/movies/<int:id>', methods=['PATCH'])
    def patch_movie(id):
        # Get actor to patch
        movie = Movies.query.get(id)
        if not movie:
          abort(404)
        # Check what values are available to patch
        data = request.get_json()
        if 'title' in data:
          movie.title = data.get("title")
        if 'release_date' in data:
          movie.release_date = data.get("release_date")
        try:
          movie.update()
        except Exception:
          abort(401)
        patched_movie = Movies.query.get(movie.id)
        return jsonify({"success": True, "Movie": patched_movie})

    return app


APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=8080, debug=True)
