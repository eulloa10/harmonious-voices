from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    content = db.Column(db.String(), nullable=False)

    owner = db.relationship('User', back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")
