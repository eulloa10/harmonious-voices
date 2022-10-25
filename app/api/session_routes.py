from flask import Blueprint, jsonify, session, request
from app.models import Channel, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

session_routes = Blueprint('me', __name__)

@session_routes.route('/channels', methods=['GET','POST'])
@login_required
def direct_messaging_channels():
    if request.method == 'GET':
      user_id = current_user.user_id
      direct_channels = Channel.query.filter_by(type='direct').filter_by(user_id_one=user_id)
      return jsonify(
        isError=False,
        message='Success',
        statusCode=200,
        data=direct_channels
      )
    else:
      pass
    # return {'users': [user.to_dict() for user in users]}
