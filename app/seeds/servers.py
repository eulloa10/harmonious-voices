from app.models import db, Server


# Adds a demo user, you can add other users here if you want
def seed_servers():
    demo = Server(
        name="server1", owner_id=1, server_img='test.jpg')
    demo1 = Server(
        name="server2", owner_id=2, server_img='test1.jpg')
    demo2 = Server(
        name="server3", owner_id=3, server_img='test2.jpg')
    demo3 = Server(
        name="server4", owner_id=4, server_img='test3.jpg')
    demo4 = Server(
        name="server5", owner_id=5, server_img='test4.jpg')


    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('DELETE FROM servers;')
    db.session.commit()
