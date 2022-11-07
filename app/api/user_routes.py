from flask import Blueprint
from flask_login import login_required
from app.models import User
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/find/<string:username>")
@login_required
def find_user(username):
    users = User.query.filter(User.username.like(f'{username}%')).filter(User.username != current_user.username)
    return {user.id: user.to_dict() for user in users}
