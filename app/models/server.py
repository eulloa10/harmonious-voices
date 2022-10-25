from .db import db
from .user_server import user_servers

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    server_img = db.Column(db.String(), nullable=True)

    # server_owner = db.relationship("User", back_populates="owned_servers")
    users = db.relationship('User', secondary=user_servers, back_populates="servers")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete-orphan")
