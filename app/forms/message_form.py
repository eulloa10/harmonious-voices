from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ChannelMessageForm(FlaskForm):
  user_id = IntegerField("User Id", validators=[DataRequired()])
  channel_id = IntegerField("Channel Id", validators=[DataRequired()])
  name = StringField("Name", validators=[DataRequired()])
  content = TextAreaField("Content", validators=[DataRequired()])
