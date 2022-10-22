from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, nullable=False)
    message_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(), nullable=False)
    user_id_one = db.Column(db.Integer, nullable=True)
    user_id_two = db.Column(db.Integer, nullable=True)
