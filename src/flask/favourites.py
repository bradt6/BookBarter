#!/bin/env python3

import jwt
import base64
import mysql.connector

from threading import Lock

from flask import Flask, request
from flask_cors import CORS
from flask_restplus import Resource, Api, fields

from common import *

app = Flask(__name__)
api = Api(app, title='Book Barter Favourites API')
CORS(app)

ns = api.namespace('Favourites', description='Favourites operations')

lock = Lock()
connection = mysql.connector.connect(host='localhost', 
                                     user='root',
                                     password='root',
                                     database='favourites')
cursor = connection.cursor(buffered=True, dictionary=True)


favourites_fields = api.model('Favourites', {
    'bookId': fields.String,
})

@api.route('/favourite')
class Favourite(Resource):
    @check_auth
    @api.expect(favourites_fields)
    def post(self):
        token = request.headers.get('Authorization');

        json = request.get_json()
        if (json is not None):
            book_id = json['book_id']

            with lock:
                query = ("SELECT * FROM user_favourites WHERE jwt_string=%s AND favourite=%s")
                cursor.execute(query, (token, book_id))
                if (cursor.rowcount > 0):
                    return {'result': False, 'error': 'Favourite already exists'}

                query = ("INSERT INTO user_favourites(jwt_string, favourite) VALUES (%s,%s)")
                cursor.execute(query, (token, book_id))
                connection.commit(); 

            return {'result': True}
        return {'result': False, 'error': 'Nothing found in body'}

    @check_auth
    def get(self):
        token = request.headers.get('Authorization');
        with lock:
            query = ("SELECT favourite FROM user_favourites WHERE jwt_string=%s")
            cursor.execute(query, (token,))
            favourites = map(lambda x: x['favourite'], cursor.fetchall());

            return {'result': list(favourites)}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, threaded=True, debug=True)
