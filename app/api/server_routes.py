from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Server, db
from .channel_routes import channel_server_routes

server_routes = Blueprint('servers', __name__)
# TODO needs seeder data to test end points
# TODO fix validations on routes to a WTForm
server_routes.register_blueprint(channel_server_routes, url_prefix="/")

@server_routes.route('/', methods=['GET'])
def get_all_servers():
    servers = Server.query.all()
    user = current_user
    print('------------', user['servers'])
    return {'Servers': [server.to_dict() for server in servers]}


@server_routes.route('/', methods=['POST'])
def create_one_server():
    name = request.json['name']
    owner_id = current_user.id
    server_img = request.json['server_img']
    server = Server(name=name, owner_id=owner_id, server_img=server_img)
    db.session.add.server()
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
        return f"{server.name} deleted"

@server_routes.route('/<int:id>', methods=['PUT'])
def update_one_server(id):
    server = Server.query.get(id)
    name = request.json['name']
    server_img = request.json['server_img']

    if(current_user.id != server.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        server.name = name
        server.server_img = server_img
        db.session.commit()
        return f"{server.name} updated"

@server_routes.route('/me', methods=['GET'])
def get_my_servers():
    servers = session.query(Server).filter(Server)
