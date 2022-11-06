from app.models import db, User, Server
import os

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', user_profile_img='https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', user_profile_img='https://i.kym-cdn.com/entries/icons/facebook/000/018/012/this_is_fine.jpg', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', user_profile_img='https://i.insider.com/55ba87b8dd0895c81c8b4581?width=1000&format=jpeg&auto=webp', password='password')
    bilbo = User(
        username='bilbo', email='bilbo@aa.io', user_profile_img='https://comicvine.gamespot.com/a/uploads/scale_medium/11/114183/6626228-the-hobbit-poster-bilbo-baggins.jpg', password='password')
    frodo = User(
        username='frodo', email='frodo@aa.io', user_profile_img='https://www.looper.com/img/gallery/frodo-baggins-12-best-moments-in-the-lord-of-the-rings-franchise-ranked/l-intro-1663422318.jpg', password='password')
    gandalf = User(
        username='gandalf', email='gandalf@aa.io', user_profile_img='https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/10/Gandalf-Name-Feature-Image.jpg', password='password')


    # server_one = Server.query.get(1)
    # server_two = Server.query.get(2)
    # server_three = Server.query.get(3)
    # server_four = Server.query.get(4)
    # server_five = Server.query.get(5)


    # demo.servers.append(server_one)
    # demo.servers.append(server_two)
    # marnie.servers.append(server_two)
    # marnie.servers.append(server_three)
    # bobbie.servers.append(server_two)
    # bobbie.servers.append(server_three)
    # bilbo.servers.append(server_one)
    # bilbo.servers.append(server_four)
    # frodo.servers.append(server_two)
    # frodo.servers.append(server_four)
    # gandalf.servers.append(server_two)
    # gandalf.servers.append(server_four)


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
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM users;')
    else:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
