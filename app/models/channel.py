from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=True)
    message_id = db.Column(db.Integer, db.ForeignKey("messages.id"), nullable=False)
    type = db.Column(db.String(), nullable=False)
    user_id_one = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user_id_two = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    messages = db.relationship("Channel", back_populates="channel", cascade="all, delete-orphan")
    server = db.relationship("Server", back_populates="server")
