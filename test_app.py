import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from models import setup_db, actors, movies


class CastingTestCase(unittest.TestCase):
    """This class represents the casting test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.headers = Bearer b'your token or whatever'
        self.client = self.app.test_client
        self.database_name = "casting_test"
        self.database_path = "postgres://{}/{}".format(
            'tomaswingord:tomasw87@localhost:5432',
            self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

    def tearDown(self):
        """Executed after reach test"""
        pass

    # TODO: Write at least one test for each test for successful \
    # operation and for expected errors. -- DONE
    def test_get_actors(self):
        res = self.client().get('/actors')
        data = json.loads(res.data)
        print(data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Actors'])

    def test_get_movies(self):
        res = self.client().get('/movies')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_delete_actor(self):
        res = self.client().delete('actors/2')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Deleted'])

    def test_delete_actor_invalid(self):
        res = self.client().delete('actors/9999')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Not found')
    
    def test_delete_movie(self):
        res = self.client().delete('movies/2')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Deleted'])

    def test_delete_movie_invalid(self):
        res = self.client().delete('movies/9999')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Not found')

    def test_post_actor(self):
        new_actor = {
            "name": "john malkovich",
            "age": 65,
            "gender": "Male"
        }
        res = self.client().post('/actors', json=new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_post_actor_invalid(self):
        new_actor = {
            "name": "invalid testing"
        }
        res = self.client().post('/actors', json=new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)

    def test_post_movie(self):
        new_movie = {
            "title": "being john malkovich",
            "release_date": "1999-11-02"
        }
        res = self.client().post('/movies', json=new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_post_movie_invalid(self):
        new_movie = {
            "name": "invalid testing"
        }
        res = self.client().post('/actors', json=new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)

    def test_patch_actor(self):
        new_actor = {
            "name": "john malkovich",
        }
        res = self.client().post('/actors/1', json=new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_patch_actor_invalid(self):
        new_actor = {
            "name": "invalid testing"
        }
        res = self.client().patch('/actors/9999', json=new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)

    def test_patch_movie(self):
        new_movie = {
            "title": "finding nemo",
        }
        res = self.client().post('/movies/1', json=new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_patch_movie_invalid(self):
        new_movie = {
            "name": "invalid testing"
        }
        res = self.client().patch('/movies/9999', json=new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
