#!/bin/env python3

import jwt
import bcrypt
import mysql.connector
from flask import Flask, request
from flask_cors import CORS
from flask_restplus import Resource, Api, fields

from common import *

app = Flask(__name__)
api = Api(app, title='Book Barter Browsing API')
CORS(app)

ns = api.namespace('Browse', description='Browse operations')

connection = mysql.connector.connect(host='localhost', 
                                     user='root',
                                     password='root',
                                     database='browse')
cursor = connection.cursor(buffered=True)

browse_fields = api.model('Browse', {
    'title': fields.String,
    'description': fields.String,
    'author': fields.String,
    'publisher': fields.String,
})

@api.route('/browse')
class Browse(Resource):
    @check_auth
    @api.expect(browse_fields)
    def post(self):
        json = request.get_json()
        title = json['title']
        description = json['description']
        author = json['author']
        publisher = json['publisher']

        query = ("INSERT INTO catalogue(title,description,author,publisher) VALUES (%s,%s,%s,%s)")
        cursor.execute(query, (title, description, author, publisher))
        connection.commit(); 

    def get(self):
        pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
