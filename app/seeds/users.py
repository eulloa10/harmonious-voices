from app.models import db, User, Server


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', user_profile_img='user-prof.jpg', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', user_profile_img='user-prof.jpg', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', user_profile_img='user-prof.jpg', password='password')
    bilbo = User(
        username='bilbo', email='bilbo@aa.io', user_profile_img='user-prof.jpg', password='password')
    frodo = User(
        username='frodo', email='frodo@aa.io', user_profile_img='user-prof.jpg', password='password')
    gandalf = User(
        username='gandalf', email='gandalf@aa.io', user_profile_img='user-prof.jpg', password='password')

    server_one = Server.query.get(1)
    server_two = Server.query.get(2)
    server_three = Server.query.get(3)
    server_four = Server.query.get(4)
    server_five = Server.query.get(5)


    demo.servers.append(server_one)
    demo.servers.append(server_two)
    marnie.servers.append(server_two)
    marnie.servers.append(server_three)
    bobbie.servers.append(server_two)
    bobbie.servers.append(server_three)
    bilbo.servers.append(server_one)
    bilbo.servers.append(server_four)
    frodo.servers.append(server_two)
    frodo.servers.append(server_four)
    gandalf.servers.append(server_two)
    gandalf.servers.append(server_four)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(bilbo)
    db.session.add(frodo)
    db.session.add(gandalf)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('DELETE FROM users;')
    db.session.commit()
