from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AddUserToServerForm(FlaskForm):
  user_id = IntegerField("User Id")
  server_id = IntegerField("Server Id")
