import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from backend.models import setup_db, actors, movies


class CastingTestCase(unittest.TestCase):
    """This class represents the casting test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56RTBSa1pDTXpZMk5qWTRRelU0T0RFMFJFUTNORVE0TmpFek9FTkdOVFUxTkRZNU9ETkdOdyJ9.eyJpc3MiOiJodHRwczovL2NhcHN0b25lLWF1dGguYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVkY2M0ZTM2YmMyMDQyMGUyODc4ZGJhNyIsImF1ZCI6ImNhcHN0b25lIiwiaWF0IjoxNTc0MjgwNjQ4LCJleHAiOjE1NzQyODc4NDgsImF6cCI6ImlURlROMXJRMWtvNXdTVHkzU1F1ODdQZTBuTVdlS0YzIiwic2NvcGUiOiIiLCJwZXJtaXNzaW9ucyI6WyJhZGQ6YWN0b3IiLCJhZGQ6bW92aWUiLCJjaGFuZ2U6YWN0b3IiLCJjaGFuZ2U6bW92aWUiLCJkZWxldGU6YWN0b3IiLCJkZWxldGU6bW92aWUiLCJyZWFkOmFjdG9ycyIsInJlYWQ6bW92aWVzIl19.IPpiGLmSGr87MkCSRTzteScV6VdZL1tpmQFD_29ApFKXll2MD_nXzp-_Y6apluBauiYApVSNi9XYVo4o6HiiBXWiVuHEZL57EYHufmvGPxieH4pU5vrhIOcMFjIRXwnj5GxyalL_hHmWtBFjRnorkKBhEj_-rRWQ11GoacfqTXSV0fRcbq7ZXt3feZmW6lZ2SFQgarfK_ZIR4bkvHywaUu9381Hq3AgSuRxz6UAQk-hkOUhs2ppQcMapRcS9PWjUv7axJiLnwvAGdytGg0DshmuF2Qy50I_vnnZ_YM2JCllb027eq9vK7TLgJr5Aazt9zJDvk8bHK57OTeA660VtCw"
        self.database_name = "casting"
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
        res = self.client().get('/actors',
                                headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Actors'])

    def test_get_movies(self):
        res = self.client().get('/movies',
                                headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_delete_actor(self):
        res = self.client().delete('actors/1',
                                   headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Deleted'])

    def test_delete_actor_invalid(self):
        res = self.client().delete('actors/99',
                                   headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_delete_movie(self):
        res = self.client().delete('movies/1',
                                   headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['Deleted'])

    def test_delete_movie_invalid(self):
        res = self.client().delete('movies/99',
                                   headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_post_actor(self):
        new_actor = {
            "name": "john malkovich",
            "age": 65,
            "gender": "Male"
        }
        res = self.client().post('/actors',
                                 headers={'Authorization': 'Bearer '+self.token}, json = new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_post_actor_invalid(self):
        res = self.client().post('/actors',
                                 headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_post_movie(self):
        new_movie = {
            "title": "being john malkovich",
            "release_date": "1999-11-02"
        }
        res = self.client().post('/movies',
                                 headers={'Authorization': 'Bearer '+self.token}, json = new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_post_movie_invalid(self):
        res = self.client().post('/movies',
                                 headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_patch_actor(self):
        new_actor = {
            "name": "john malkovich",
        }
        res = self.client().patch('/actors/4',
                                  headers={'Authorization': 'Bearer '+self.token}, json = new_actor)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_patch_actor_invalid(self):
        res = self.client().patch('/actors/99',
                                  headers={'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_patch_movie(self):
        new_movie = {
            "title": "finding nemo",
        }
        res = self.client().patch('/movies/3',
                                  headers={'Authorization': 'Bearer '+self.token}), json = new_movie)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    def test_patch_movie_invalid(self):
        res = self.client().patch('/movies/99',
        headers = {'Authorization': 'Bearer '+self.token})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
