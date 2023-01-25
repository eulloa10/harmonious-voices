from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Server, db, User
from ..models.server import ServerMember
from ..forms.add_user_to_server_form import AddUserToServerForm


server_member_routes = Blueprint('server_member', __name__)

@server_member_routes.route('/<int:userId>/<int:serverId>', methods=['POST'])
def add_user_to_server(userId, serverId):

    form =AddUserToServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_member = ServerMember(
            user_id=userId,
            server_id=serverId
        )
        db.session.add(server_member)
        db.session.commit()
        return{"message": f"{userId} added to server: {serverId}"}
    else:
        return {"error": "User unable to be added"}

@server_member_routes.route('/<int:userId>/<int:serverId>', methods=['DELETE'])
def remove_user_from_server(userId, serverId):
    server_member = db.session.query(ServerMember).filter(ServerMember.user_id == userId, ServerMember.server_id == serverId).first()

    if(server_member):
        db.session.delete(server_member)
        db.session.commit()
        return{"message": f"{userId} was removed from server: {serverId}"}
    else:
        return {"error": "User unable to be removed"}
