from app.models import db, user_servers, ServerMember
import os

# Adds a demo user, you can add other users here if you want
# def seed_user_servers():
#     demo = user_servers.append(user_id=1, server_id=1)
#     demo2 = user_servers(user_id=1, server_id=2)
#     demo3 = user_servers(user_id=2, server_id=2)
#     demo4 = user_servers(user_id=2, server_id=3)
#     demo5 = user_servers(user_id=3, server_id=3)
#     demo6 = user_servers(user_id=3, server_id=4)
#     demo7 = user_servers(user_id=4, server_id=4)
#     demo8 = user_servers(user_id=4, server_id=5)
#     demo9 = user_servers(user_id=5, server_id=5)
#     demo10 = user_servers(user_id=5, server_id=1)
#     demo11 = user_servers(user_id=6, server_id=2)
#     demo12 = user_servers(user_id=6, server_id=3)


#     db.session.add(demo)
#     db.session.add(demo2)
#     db.session.add(demo3)
#     db.session.add(demo4)
#     db.session.add(demo5)
#     db.session.add(demo6)
#     db.session.add(demo7)
#     db.session.add(demo8)
#     db.session.add(demo9)
#     db.session.add(demo10)
#     db.session.add(demo11)
#     db.session.add(demo12)

#     db.session.commit()

def seed_user_servers():
    demo = ServerMember(user_id=2, server_id=1)
    demo2 = ServerMember(user_id=1, server_id=2)
    demo3 = ServerMember(user_id=4, server_id=2)
    demo4 = ServerMember(user_id=2, server_id=3)
    demo5 = ServerMember(user_id=4, server_id=3)
    demo6 = ServerMember(user_id=3, server_id=4)
    demo7 = ServerMember(user_id=4, server_id=6)
    demo8 = ServerMember(user_id=4, server_id=5)
    demo9 = ServerMember(user_id=5, server_id=6)
    demo10 = ServerMember(user_id=5, server_id=1)
    demo11 = ServerMember(user_id=6, server_id=2)
    demo12 = ServerMember(user_id=6, server_id=3)


    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_user_servers():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM server_members;')
    else:
        db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()
