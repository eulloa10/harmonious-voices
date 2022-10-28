from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ChannelMessageForm(FlaskForm):
  user_id = IntegerField("User Id")
  channel_id = IntegerField("Channel Id")
  content = TextAreaField("Content", validators=[DataRequired()])
