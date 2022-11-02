from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from app.models import Channel
from sqlalchemy import or_, and_
from app.models import User
from wtforms.validators import ValidationError

def direct_message_exists(form, field):
  user_id_two = field.data
  channel = Channel.query.filter(or_(and_(Channel.user_id_one == current_user.id, Channel.user_id_two == user_id_two), and_(Channel.user_id_two == current_user.id, Channel.user_id_one == user_id_two))).first()
  if channel:
    raise ValidationError("Direct channel already exists")

class DirectMessageChannelForm(FlaskForm):
  type = StringField("Type")
  user_id_one = IntegerField("User Id One")
  user_id_two = IntegerField("User Id Two",
                              validators=[direct_message_exists]
                             )
