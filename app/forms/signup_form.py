from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    image = FileField('profile_image')
    username = StringField(
        'username', validators=[DataRequired(message="Please provide a valid username"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Please provide a valid email address"), user_exists])
    password = StringField('password', validators=[DataRequired(message="Please provide a valid password")])
