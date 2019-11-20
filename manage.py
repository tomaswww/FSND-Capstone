from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from backend.flaskr.__init__ import create_app
from backend.flaskr.models import setup_db

app = create_app()
db = setup_db()
migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
