#!/bin/env python

import jwt
import bcrypt
import mysql.connector
from flask import Flask, request
from flask_cors import CORS
from flask_restplus import Resource, Api, fields

from common import *

app = Flask(__name__)
api = Api(app, title='Book Barter API')
CORS(app)

ns = api.namespace('Users', description='User operations')

connection = mysql.connector.connect(host='localhost', 
                                     user='root',
                                     password='root',
                                     database='users')
cursor = connection.cursor(buffered=True)


user_fields = api.model('Login', {
    'username': fields.String,
    'password': fields.String
})
@api.route('/login')
class Login(Resource):
    @api.expect(user_fields)
    def post(self):
        json = request.get_json()
        username = json['username']
        password = json['password']

        query = ("SELECT password FROM users WHERE username=%s")
        cursor.execute(query, (username,)) 

        result = False
        if (cursor.rowcount):
            fetched_hash = cursor.fetchone()[0]
            result = bcrypt.checkpw(password.encode(), fetched_hash.encode())

        if (result == True):
            token = jwt.encode({'username': username}, secret_jwt_key).decode()
            return {'result': True, 'token': token}
        return {'result': False}

@api.route('/register')
class Register(Resource):
    @api.expect(user_fields)
    def post(self):
        json = request.get_json()
        username = json['username']
        password = json['password']

        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        query = ("INSERT INTO users(username,password) VALUES (%s,%s)")
        cursor.execute(query, (username,hashed))
        connection.commit()

        return {'result': True}
        
if __name__ == '__main__':
    app.run(debug=True)
