from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_server import user_servers

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)
    server_img = db.Column(db.String(), nullable=True)

    # server_owner = db.relationship("User", back_populates="owned_servers")
    members = db.relationship('ServerMember', backref='server', cascade="all, delete-orphan")
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'server_img': self.server_img,
            'members': [user.to_dict() for user in self.members],
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
        }

class ServerMember(db.Model):
    __tablename__ = 'server_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=True)

    # user = db.relationship('User', secondary=user_servers, back_ref="servers")


    def to_dict(self):
        return {
            'id': self.user.id,
            'name': self.user.username,
            'user_profile_img': self.user.user_profile_img,
            'server_id': self.server_id,
            'server': self.server.to_resource_dict()
        }
