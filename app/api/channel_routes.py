from flask import Blueprint, request
from app.forms import channel_server_form
from app.models import Channel, db, server
from flask_login import current_user, login_required
from ..forms.channel_server_form import ChannelServerForm


channel_server_routes = Blueprint("channel_servers", __name__)


def server_is_owned_by_user(serverId):
  for server in current_user.owned_servers:
    if server.id == serverId:
      return True
  return False


@channel_server_routes.route("/<int:serverId>/channels", methods=["GET"])
def get_all_channels(serverId):
  channels = Channel.query.filter(Channel.server_id == serverId)
  return {'channels': [channel.to_dict() for channel in channels]}


@channel_server_routes.route("/<int:serverId>/channels", methods=["POST"])
@login_required
def create_a_channel(serverId):
  form = ChannelServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if server_is_owned_by_user(serverId):
      channel = Channel(
        name=form.data["name"],
        server_id=serverId,
        type="direct"
      )
      db.session.add(channel)
      db.session.commit()
      return channel.to_dict()
    else:
      return {"error": "Unauthorized user"}
  else:
    return {"error": "Please enter a valid name"}


@channel_server_routes.route("/<int:serverId>/channels/<int:channelId>", methods=["GET"])
@login_required
def get_a_channel(serverId, channelId):
  channel = Channel.query.get(channelId)
  return channel.to_dict()


@channel_server_routes.route("/<int:serverId>/channels/<int:channelId>", methods=["PUT"])
@login_required
def edit_a_channel(serverId, channelId):
  if server_is_owned_by_user(serverId):
    channel = Channel.query.get(channelId)
    form = ChannelServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      channel.name = form.data["name"]
      db.session.commit()
      return channel.to_dict()
    else:
      return {"error": "Please enter a valid name"}
  else:
    return {"error": "Unauthorized user"}


@channel_server_routes.route("/<int:serverId>/channels/<int:channelId>", methods=['DELETE'])
@login_required
def delete_a_channel(serverId, channelId):
    channel = Channel.query.get(channelId)
    if server_is_owned_by_user(serverId):
      db.session.delete(channel)
      db.session.commit()
      return {"message": "Channel was successfully deleted"}
    else:
      return {"error": "You cannot delete another person's channel"}
