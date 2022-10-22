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

    owned_servers = db.relationship('Server', back_populates='server_owner')
    servers = db.relationship('Server', secondary=user_servers, back_populates="users")
    messages = db.relationship("Message", back_populates="owner", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
