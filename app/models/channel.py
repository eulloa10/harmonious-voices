from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=True)
    type = db.Column(db.String())
    user_id_one = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user_id_two = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user_one_active = db.Column(db.Boolean, default=True, nullable=True)
    user_two_active = db.Column(db.Boolean, default=True, nullable=True)

    messages = db.relationship("Message", back_populates="channel", cascade="all, delete-orphan")
    server = db.relationship("Server", back_populates="channels")
    user_one = db.relationship("User", foreign_keys=[user_id_one])
    user_two = db.relationship("User", foreign_keys=[user_id_two])

    def to_dict(self):
        response = {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'type': self.type,
        }

        if self.user_id_one and self.user_id_two:
            response["userOne"] = self.user_one.to_dict()
            response["userOneActive"] = self.user_one_active
            response["userTwo"] = self.user_two.to_dict()
            response["userTwoActive"] = self.user_two_active

        return response
