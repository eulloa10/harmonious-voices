from flask import Blueprint, request
from server_routes import server_routes
from app.models import Channel, db
from flask_login import current_user, login_required

channel_routes = Blueprint("channel_servers", __name__)

def is_server_owned_by_user(user, serverId):
  for server in user.owned_servers:
    if server.id == serverId:
      return True
  return False

@server_routes.route("/<int:serverId>/channels", methods=["GET"])
def get_all_channels(serverId):
  channels = Channel.query.filter(Channel.server_id == serverId)
  return {'channels': [channel.to_dict() for channel in channels]}


@server_routes.route("/<int:serverId>/channels", methods=["POST"])
@login_required
def create_a_channel(serverId):
  if is_server_owned_by_user(current_user, serverId):
    channel = Channel(
      name=request.json["name"],
      server_id = serverId
    )
    db.session.add(channel)
    db.session.commit()
  else:
    return {"error": "Unauthorized"}

@server_routes.route("/<int:serverId>/channels/:channelId", methods=["PUT"])
@login_required
def create_a_channel(serverId, channelId):
  if is_server_owned_by_user(current_user, serverId):
    channel = Channel.query.get(channelId)
    name = request.json["name"]
    server_id = request.json["server_id"]

    if is_server_owned_by_user(current_user, serverId):
      channel.name = name
      channel.server_id = server_id
      db.session.commit()
      return channel.to_dict()
    else:
      return {"error": "You cannot edit another person's channel"}


@server_routes.route("/<int:serverId>/channels/:channelId", methods=['DELETE'])
@login_required
def delete_one_server(serverId, channelId):
    channel = Channel.query.get(channelId)
    if is_server_owned_by_user(current_user, serverId):
      db.session.delete(channel)
      db.session.commit()
      return {"message": "Channel was successfully deleted"}
    else:
      return {"error": "You cannot delete another person's channel"}
