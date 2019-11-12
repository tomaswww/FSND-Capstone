import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy, database,DateTime
import json

# database_name = "trivia"
database_path = 'postgresql://tomaswingord:tomasw87@localhost:5432/casting'

db = SQLAlchemy()


'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


'''
Actors

'''
class Actors(db.Model):
    
    __tablename__ = 'Actors'

    id = Column(Integer, primary_key=True)
    name = Column(String(180), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(180), nullable=False)

    '''delete()
    deletes a new model into a database
    the model must exist in the database
    '''
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    '''
    insert()
        inserts a new model into a database
        the model must have a unique name
        the model must have a unique id or null id
    '''
    def insert(self):
        db.session.add(self)
        db.session.commit()

    '''
    update()
        updates a new model into a database
        the model must exist in the database
    '''
    def update(self):
        db.session.commit()


'''
Movies

'''


class Movies(db.Model):

    __tablename__ = 'Movies'

    id = Column(Integer, primary_key=True)
    title = Column(String(180), nullable=False)
    release_date = Column(database.DateTime, nullable=False)

    '''delete()
    deletes a new model into a database
    the model must exist in the database
    '''

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    '''
    insert()
        inserts a new model into a database
        the model must have a unique name
        the model must have a unique id or null id
    '''

    def insert(self):
        db.session.add(self)
        db.session.commit()

    '''
    update()
        updates a new model into a database
        the model must exist in the database
    '''

    def update(self):
        db.session.commit()
    
