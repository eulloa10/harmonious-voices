from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ChannelServerForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  server_id = IntegerField("Server Id")
  type = StringField("Type")
  user_id_one = IntegerField("User Id One")
  user_id_two = IntegerField("User Id Two")
