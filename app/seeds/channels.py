from app.models import db, Channel
import os


# Adds a demo user, you can add other users here if you want
def seed_channels():
    demo_channel_1 = Channel(
        name="demo1", server_id=None, type='direct', user_id_one=1, user_id_two=2)
    demo_channel_2 = Channel(
        name="demo2",server_id=2, type='server', user_id_one=None, user_id_two=None)
    demo_channel_3 = Channel(
        name="demo3", server_id=None, type='direct', user_id_one=3, user_id_two=4)
    demo_channel_4 = Channel(
        name="demo4", server_id=4, type='server', user_id_one=None, user_id_two=None)
    demo_channel_5 = Channel(
        name="demo5",server_id=5, type='server', user_id_one=None, user_id_two=None)

    db.session.add(demo_channel_1)
    db.session.add(demo_channel_2)
    db.session.add(demo_channel_3)
    db.session.add(demo_channel_4)
    db.session.add(demo_channel_5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM channels;')
    else:
        db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')

    db.session.commit()
