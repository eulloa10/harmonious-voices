from app.models import db, Server
import os

# Adds a demo user, you can add other users here if you want
def seed_servers():
    demo = Server(
        name="Demo Server", owner_id=1)
    demo1 = Server(
        name="Marnie's Server", owner_id=2)
    demo2 = Server(
        name="Bobbie's Server", owner_id=3)
    demo3 = Server(
        name="Bilbo's Server", owner_id=4)
    demo4 = Server(
        name="Frodo's Server", owner_id=5)
    demo5 = Server(
        name="Gandalf's Server", owner_id=6)


    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM servers;')
    else:
        db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
