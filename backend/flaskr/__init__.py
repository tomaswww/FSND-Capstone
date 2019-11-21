import os
from flask import Flask, request, abort, jsonify, render_template, \
    Response, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import random
from backend.models import setup_db, actors, movies
from .auth.auth import AuthError, requires_auth


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    db = SQLAlchemy(app)
    migrate = Migrate(app, db) # this    


    # GET /actors and /movies --> DONE
    @app.route('/actors', methods=['GET'])
    @requires_auth(permission='read:actors')
    def get_actors(payload):
        all_actors = actors.query.all()
        results = []
        for actor in all_actors:
            one_actor = {}
            one_actor["id"] = actor.id
            one_actor["name"] = actor.name
            one_actor["age"] = actor.age
            one_actor["gender"] = actor.gender
            results.append(one_actor)
        if not results:
            abort(404)
        return jsonify({"success": True, "Actors": results})

    @app.route('/movies', methods=['GET'])
    @requires_auth(permission='read:movies')
    def get_movies(payload):
        all_movies = movies.query.all()
        results = []
        for movie in all_movies:
            one_movie = {}
            one_movie["id"] = movie.id
            one_movie["title"] = movie.title
            one_movie["release_date"] = movie.release_date
            results.append(one_movie)
        if not results:
            abort(404)
        return jsonify({"success": True, "Movies": results})

    # DELETE / actors / and / movies/
    @app.route('/actors/<int:id>', methods=['DELETE'])
    @requires_auth(permission='delete:actor')
    def delete_actor(payload, id):
        actor = actors.query.get(id)
        if not actor:
            abort(404)
        try:
            actor.delete()
        except Exception:
            abort(401)
        return jsonify({"success": True, "Deleted": id})

    @app.route('/movies/<int:id>', methods=['DELETE'])
    @requires_auth(permission='delete:movie')
    def delete_movie(payload, id):
        movie = movies.query.get(id)
        if not movie:
            abort(404)
        try:
            movie.delete()
        except Exception:
            abort(401)
        return jsonify({"success": True, "Deleted": id})

    # POST / actors and / movies and
    @app.route('/actors', methods=['POST'])
    @requires_auth(permission='add:actor')
    def post_actor(payload):
        data = request.get_json()
        if not data:
            abort(400)

        new_name = data.get("name")
        new_age = data.get("age")
        new_gender = data.get("gender")

        if not new_name or not new_age or not new_gender:
            abort(400)

        # Create a new actor
        new_actor = actors(name=new_name, age=new_age, gender=new_gender)
        try:
            new_actor.insert()
        except Exception:
            abort(401)

        # Query for new actor
        new_actor_id = new_actor.id
        new_actors = actors.query.get(new_actor_id)
        one_actor = {}
        one_actor["id"] = new_actors.id
        one_actor["name"] = new_actors.name
        one_actor["age"] = new_actors.age
        one_actor["gender"] = new_actors.gender

        return jsonify({"success": True, "Actor": one_actor})

    @app.route('/movies', methods=['POST'])
    @requires_auth(permission='add:movie')
    def post_movie(payload):
        data = request.get_json()
        if not data:
            abort(400)
        new_title = data.get("title")
        new_release_date = data.get("release_date")
        if not new_title or not new_release_date:
            abort(400)
        # Create a new movie
        new_movie = movies(title=new_title, release_date=new_release_date)
        try:
            new_movie.insert()
        except Exception:
            abort(401)
        # Query for new actor
        new_movie_id = new_movie.id
        new_movies = movies.query.get(new_movie_id)
        one_movie = {}
        one_movie["id"] = new_movies.id
        one_movie["title"] = new_movies.title
        one_movie["release_date"] = new_movies.release_date
        return jsonify({"success": True, "Movie": one_movie})

    # PATCH / actors / and / movies/
    @app.route('/actors/<int:id>', methods=['PATCH'])
    @requires_auth(permission='change:actor')
    def patch_actor(payload, id):
        # Get actor to patch
        new_actor = actors.query.get(id)
        if not new_actor:
            abort(404)
        # Check what values are available to patch
        data = request.get_json()
        if 'name' in data:
            new_actor.name = data.get("name")
        if 'age' in data:
            new_actor.age = data.get("age")
        if 'gender' in data:
            new_actor.gender = data.get("gender")
        try:
            new_actor.update()
        except Exception:
            abort(401)
        patched_actor = actors.query.get(new_actor.id)
        one_actor = {}
        one_actor["id"] = patched_actor.id
        one_actor["name"] = patched_actor.name
        one_actor["age"] = patched_actor.age
        one_actor["gender"] = patched_actor.gender
        return jsonify({"success": True, "Actor": one_actor})

    @app.route('/movies/<int:id>', methods=['PATCH'])
    @requires_auth(permission='change:movie')
    def patch_movie(payload, id):
        # Get actor to patch
        new_movie = movies.query.get(id)
        if not new_movie:
            abort(404)
        # Check what values are available to patch
        data = request.get_json()
        if 'title' in data:
            new_movie.title = data.get("title")
        if 'release_date' in data:
            new_movie.release_date = data.get("release_date")
        try:
            new_movie.update()
        except Exception:
            abort(401)
        patched_movie = movies.query.get(new_movie.id)
        one_movie = {}
        one_movie["id"] = new_movie.id
        one_movie["title"] = new_movie.title
        one_movie["release_date"] = new_movie.release_date
        return jsonify({"success": True, "Movie": one_movie})

    # @TODO: Create error handlers for all expected errors \
    #  including 404 and 422. --> DONE

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "Not found"
        }), 404

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            "success": False,
            "error": 401,
            "message": "Unauthorized"
        }), 401

    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "Unprocessable Entity"
        }), 422

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "success": False,
            "error": 405,
            "message": "Method not allowed"
        }), 405

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": "Bad Request error"
        }), 400

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False,
            "error": 500,
            "message": "Internal server error"
        }), 500

    return app


APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=8080, debug=True)
