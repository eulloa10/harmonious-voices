from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=True)
    type = db.Column(db.String())
    user_id_one = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user_id_two = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    messages = db.relationship("Message", back_populates="channel", cascade="all, delete-orphan")
    server = db.relationship("Server", back_populates="channels")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
