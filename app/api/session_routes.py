from flask import Blueprint, jsonify, session, request
from app.models import Channel, Server, db
from flask_login import current_user, login_required
from ..forms.dm_channel_form import DirectMessageChannelForm

session_routes = Blueprint('me', __name__)


@session_routes.route('/servers', methods=['GET'])
@login_required
def get_owned_servers():
  user_id = current_user.id
  owned_servers = Server.query.filter(Server.owner_id==user_id)
  return {'owned_servers': [server.to_dict() for server in owned_servers]}

@session_routes.route('/channels', methods=['GET'])
@login_required
def get_dm_channels():
  user_id = current_user.id
  direct_channels = Channel.query.filter(Channel.type=='direct', Channel.user_id_one==user_id)
  return {'direct_channels': [channel.to_dict() for channel in direct_channels]}


@session_routes.route('/channels', methods=['POST'])
@login_required
def create_dm_channel():
  form = DirectMessageChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  channel_data = request.get_json()
  if form.validate_on_submit():
    channel = Channel(
      name=channel_data['name'],
      type='direct',
      user_id_one=current_user.id,
      user_id_two=channel_data['user_id_two']
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
