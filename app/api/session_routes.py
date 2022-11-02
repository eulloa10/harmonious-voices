from flask import Blueprint, jsonify, session, request
from app.models import Channel, Server, db
from flask_login import current_user, login_required
from ..forms.dm_channel_form import DirectMessageChannelForm
from sqlalchemy import or_, and_

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
  direct_channels = Channel.query.filter(Channel.type == 'direct').filter(or_(and_(Channel.user_id_one == user_id, Channel.user_one_active == True), and_(Channel.user_id_two == user_id, Channel.user_two_active == True)))
  return {'directChannels': [channel.to_dict() for channel in direct_channels]}


@session_routes.route('/channels', methods=['POST'])
@login_required
def create_dm_channel():
  form = DirectMessageChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    channel = Channel(
      type='direct',
      user_id_one=current_user.id,
      user_id_two=form.data['user_id_two']
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()
  user_id_two = form.data['user_id_two']
  channel = Channel.query.filter(or_(and_(Channel.user_id_one == current_user.id, Channel.user_id_two == user_id_two), and_(Channel.user_id_two == current_user.id, Channel.user_id_one == user_id_two))).first()
  if (channel.user_id_one == current_user.id):
    channel.user_one_active = True
    db.session.commit()
  if (channel.user_id_one == current_user.id):
    channel.user_two_active = True
    db.session.commit()
  print(channel)
  return channel.to_dict()

# Test


# @session_routes.route('/channels/<int:channelId>', methods=['PUT'])
# @login_required
# def edit_dm_channel(channelId):
#   channel = Channel.query.get(channelId)
#   form = DirectMessageChannelForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if current_user.id == channel.user_id_one:
#     channel.name = form.data["name"]
#     db.session.commit()
#     return channel.to_dict()
#   else:
#     return {"error": "Please enter a valid name"}


@session_routes.route('/channels/<int:channelId>', methods=['DELETE'])
@login_required
def delete_dm_channel(channelId):
  channel = Channel.query.get(channelId)
  if current_user.id == channel.user_id_one or current_user.id == channel.user_id_two:
    if current_user.id == channel.user_id_one:
      channel.user_one_active = False
    if current_user.id == channel.user_id_two:
      channel.user_two_active = False
    db.session.commit()
    return {"message": "Channel was successfully deleted"}
