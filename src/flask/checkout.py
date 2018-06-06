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
api = Api(app, title='Book Barter Checkout API')
CORS(app)

ns = api.namespace('Checkout', description='Checkout operations')
api.add_namespace(ns)

lock = Lock()
connection = mysql.connector.connect(host='localhost', 
                                     user='root',
                                     password='root',
                                     database='checkout')
cursor = connection.cursor(buffered=True, dictionary=True)

checkout_fields = api.model('Checkout', {
    'bookId': fields.String,
})

@api.route('/cart')
class Cart(Resource):
    @check_auth
    @api.expect(checkout_fields)
    def post(self):
        token = request.headers.get('Authorization');

        json = request.get_json()
        if (json is not None):
            book_id = json['book_id']

            with lock:
                query = ("SELECT * FROM user_cart WHERE jwt_string=%s AND book=%s")
                cursor.execute(query, (token, book_id))
                if (cursor.rowcount > 0):
                    return {'result': False, 'error': 'Item already in cart'}

                query = ("INSERT INTO user_cart(jwt_string, book) VALUES (%s,%s)")
                cursor.execute(query, (token, book_id))
                connection.commit(); 

            return {'result': True}
        return {'result': False, 'error': 'Nothing found in body'}

    @check_auth
    def get(self):
        token = request.headers.get('Authorization');
        with lock:
            query = ("SELECT book FROM user_cart WHERE jwt_string=%s")
            cursor.execute(query, (token,))
            books = map(lambda x: x['book'], cursor.fetchall());

            return {'result': list(books)}

@api.route('/cart/remove')
class CartRemove(Resource):
    @check_auth
    @api.expect(checkout_fields)
    def post(self):
        token = request.headers.get('Authorization');

        json = request.get_json()
        if (json is not None):
            book_id = json['book_id']

            with lock:
                query = ("DELETE FROM user_cart WHERE jwt_string=%s AND book=%s")
                cursor.execute(query, (token, book_id))
                connection.commit(); 

            return {'result': True}
        return {'result': False, 'error': 'Nothing found in body'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, threaded=True, debug=True)
