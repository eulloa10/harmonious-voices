from flask import Blueprint, jsonify, session, request
from app.models import Channel, User, db
from flask_login import current_user, login_required
from ..forms.dm_channel_form import DirectMessageChannelForm

session_routes = Blueprint('me', __name__)


@session_routes.route('/channels', methods=['GET'])
@login_required
def get_dm_channels():
  user_id = current_user.id
  direct_channels = Channel.query.filter(Channel.type=='direct', Channel.user_id_one==user_id)
  return {'direct_channels': [channel.to_dict() for channel in direct_channels]}


@session_routes.route('/channels', methods=['POST'])
@login_required
def create_dm_channel(user_id_2):
  form = DirectMessageChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  user_2_info = User.query.filter(User.id == user_id_2)
  if form.validate_on_submit():
    channel = Channel(
      name=user_2_info.username,
      type='direct',
      user_id_one=current_user.id,
      user_id_two=user_id_2
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


@session_routes.route('/channels/<int:channelId>', methods=['PUT'])
@login_required
def edit_dm_channel(channelId):
  channel = Channel.query.get(channelId)
  form = DirectMessageChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.id == channel.user_id_one:
    channel.name = form.data["name"]
    db.session.commit()
    return channel.to_dict()
  else:
    return {"error": "Please enter a valid name"}


@session_routes.route('/channels/<int:channelId>', methods=['DELETE'])
@login_required
def delete_dm_channel(channelId):
  channel = Channel.query.get(channelId)
  if current_user.id == channel.user_id_one:
    db.session.delete(channel)
    db.session.commit()
    return {"message": "Channel was successfully deleted"}
