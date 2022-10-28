from flask.cli import AppGroup

from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .servers import seed_servers, undo_servers
from .users import seed_users, undo_users
# from .user_servers import seed_user_servers, undo_user_servers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_channels()
    seed_messages()
    seed_servers()
    seed_users()
    # seed_user_servers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_channels()
    undo_messages()
    undo_servers()
    # undo_user_servers()
    # Add other undo functions here
