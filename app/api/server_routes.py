from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Server, db, User
from .channel_routes import channel_server_routes
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


server_routes = Blueprint('servers', __name__)
server_routes.register_blueprint(channel_server_routes, url_prefix="/")

@server_routes.route('/me', methods=['GET'])
def get_my_servers():
    user_id = current_user.id
    user = User.query.get(user_id)
    servers = user.server_member
    return {'MyServers': [server.server.to_dict() for server in servers]}

@server_routes.route('/owned', methods=['GET'])
def get_owned_servers():
    user_id = current_user.id
    user = User.query.get(user_id)
    user_to_dict = user.to_dict()
    user_servers = user_to_dict['owned_servers']
    return {'OwnedServers': [server for server in user_servers]}


@server_routes.route('/', methods=['GET'])
def get_all_servers():
    servers = Server.query.all()
    return {'Servers': [server.to_dict() for server in servers]}


@server_routes.route('', methods=['POST'])
def create_one_server():
    url = None

    if "image" in request.files:
        image = request.files['image']
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400
        url = upload["url"]

    name = request.form['name']
    owner_id = current_user.id
    server_img = url
    server = Server(name=name, owner_id=owner_id, server_img=server_img)
    db.session.add(server)
    db.session.commit()
    return server.to_dict()


@server_routes.route('/<int:id>', methods=['GET'])
def get_one_server(id):
    server = Server.query.get(id)
    return server.to_dict()

@server_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_server(id):
    server = Server.query.get(id)
    if(current_user.id != server.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        db.session.delete(server)
        db.session.commit()
        return {"Message": "Deleted"}

@server_routes.route('/<int:id>', methods=['PUT'])
def update_one_server(id):
    server = Server.query.get(id)

    if(current_user.id != server.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        url = None

        if "image" in request.files:
            image = request.files['image']
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400
            url = upload["url"]

        server.name = request.form['name']
        server.server_img = url
        db.session.commit()

        return {'Message': "updated"}
