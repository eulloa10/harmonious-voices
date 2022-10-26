from app.models import db, Message


# Adds a demo user, you can add other users here if you want
def seed_messages():
    demo_message_1 = Message(
        user_id=1, channel_id=1, content='test message 1')
    demo_message_2 = Message(
        user_id=2, channel_id=2, content='test message 2')
    demo_message_3 = Message(
        user_id=3, channel_id=3, content='test message 3')
    demo_message_4 = Message(
        user_id=3, channel_id=4, content='test message 4')
    demo_message_5 = Message(
        user_id=3, channel_id=5, content='test message 5')

    db.session.add(demo_message_1)
    db.session.add(demo_message_2)
    db.session.add(demo_message_3)
    db.session.add(demo_message_4)
    db.session.add(demo_message_5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('DELETE FROM messages;')
    db.session.commit()
