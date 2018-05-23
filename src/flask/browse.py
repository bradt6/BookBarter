#!/bin/env python3

import jwt
import base64
import bcrypt
import mysql.connector

from PIL import Image
from io import BytesIO

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
cursor = connection.cursor(buffered=True, dictionary=True)

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
        if (json is not None):
            title = json['title']
            description = json['description']
            author = json['author']
            publisher = json['publisher']
            picture = json['picture']

            query = ("SELECT * FROM catalogue WHERE title=%s")
            cursor.execute(query, (title,))
            if (cursor.rowcount > 0):
                return {'result': False, 'error': 'Book already exists'}

            size = 128,128
            b64_decoded = base64.b64decode(picture.split(',')[1])
            im = Image.open(BytesIO(b64_decoded))
            im.thumbnail(size, Image.ANTIALIAS)
            final_buffer = BytesIO()
            im.save(final_buffer, format="PNG")
            picture = base64.b64encode(final_buffer.getvalue())

            query = ("INSERT INTO catalogue(title,description,author,publisher,picture) VALUES (%s,%s,%s,%s,%s)")
            cursor.execute(query, (title, description, author, publisher, picture))
            connection.commit(); 
            return {'result': True}
        return {'result': False, 'error': 'Nothing found in body'}

    def get(self):
        query = ("SELECT * from catalogue")
        cursor.execute(query)

        books = cursor.fetchall();
        return {'result': books}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
