from .db import db
from .user_server import user_servers

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    server_img = db.Column(db.String(), nullable=True)

    users = db.relationship('User', secondary=user_servers, back_populates="servers")
