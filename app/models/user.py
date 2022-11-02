from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_server import user_servers

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    user_profile_img = db.Column(db.String(), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_servers = db.relationship('Server', backref='server_owner', cascade="all, delete-orphan")
    server_member = db.relationship('ServerMember', backref="user", cascade="all, delete-orphan")
    messages = db.relationship("Message", back_populates="owner", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @property
    def joined_servers_ids(self):
        joined_servers = []
        for i in range(len(self.server_member)):
            membership = self.server_member[i].to_dict()
            joined_servers.append(membership["server_id"])
        return joined_servers

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'user_profile_img': self.user_profile_img,
            'servers': [server.to_dict() for server in self.server_member],
            'owned_servers': [server.to_dict() for server in self.owned_servers]
        }
