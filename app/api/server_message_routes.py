from flask import Blueprint, jsonify, session, request
from app.models import Channel, User, Message, db
from flask_login import current_user, login_required
from ..forms.message_form import ChannelMessageForm

channel_routes = Blueprint("channels", __name__)
message_routes = Blueprint('messages', __name__)


@channel_routes.route('/<int:channelId>/messages', methods=['GET'])
def get_channel_messages(channelId):
  messages = Message.query.filter(Message.channel_id==channelId)
  return {'messages': [message.to_dict() for message in messages]}


@channel_routes.route('/<int:channelId>/messages', methods=['POST'])
@login_required
def create_channel_message(channelId):
  form = ChannelMessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = Channel(
      user_id=current_user.id,
      channelId=channelId,
      content=form.data['content']
    )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()


@message_routes.route('/messages/<int:messageId>', methods=['PUT'])
@login_required
def edit_channel_message(messageId):
  message = Message.query.get(messageId)
  form = ChannelMessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.id == message.user_id:
    message.content = form.data["content"]
    db.session.commit()
    return message.to_dict()



@message_routes.route('/messages/<int:messageId>', methods=['DELETE'])
@login_required
def delete_channel_message(messageId):
  message = Message.query.get(messageId)
  if current_user.id == message.user_id:
    db.session.delete(message)
    db.session.commit()
    return {"message": "Message was successfully deleted"}