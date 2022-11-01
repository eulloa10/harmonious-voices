from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class DirectMessageChannelForm(FlaskForm):
  type = StringField("Type")
  user_id_one = IntegerField("User Id One")
  user_id_two = IntegerField("User Id Two")
