# I made this as an example of how flask will run and how you'll annotate your endpoints
from flask import Flask, request, jsonify
from flask_cors import CORS 


class example: 
    def __init__(self):
        self.app = Flask(__name__)
        self.ppl = []
        self.cors = CORS(self.app, origins=['*'])

        self.setup_routes()

    def setup_routes(self):
        @self.app.route("/api/getAllUsers", methods=['GET']) # Used to GET information in requests, only put function calls where relevant info will be passed to FE here
        def getUsers():
            return jsonify(self.ppl), 200
        
        @self.app.route("/api/addUser", methods=['POST']) # Used by FE to POST aka update info on the backend
        def addUser():
            name = request.args.get('name')
            print(name)
            if name:
                self.ppl.append(name)
                return jsonify(f"{name} was added to the users"), 201
            else:
                return jsonify(f"Error occured and user was not added to the users"), 500
        
        @self.app.route("/api/deleteUser/<name>", methods=['DELETE']) # Used by FE to DELETE aka delete info on the backend
        def deleteUser(name):
            if name and name in self.ppl:
                self.ppl.remove(name)
                return jsonify(f"{name} was deleted from the users list"), 200
            else:
                return jsonify("User was NOT deleted from the users list"), 404
    
    
    def run(self):
        self.app.run(debug=True)

examplae = example()
examplae.run()