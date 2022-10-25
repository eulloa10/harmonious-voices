from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    demo_channel_1 = Channel(
        server_id='Demo', message_id=1, type='direct', user_id_one=1, user_id_two=2)
    demo_channel_2 = Channel(
        server_id=2, message_id=2, type='server', user_id_one=None, user_id_two=None)
    demo_channel_3 = Channel(
        server_id=3, message_id=3, type='direct', user_id_one=3, user_id_two=4)
    demo_channel_4 = Channel(
        server_id=4, message_id=4, type='server', user_id_one=None, user_id_two=None)
    demo_channel_5 = Channel(
        server_id=5, message_id=5, type='server', user_id_one=None, user_id_two=None)

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
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()