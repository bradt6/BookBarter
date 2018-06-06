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

@api.route('/checkout')
class Checkout(Resource):
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, threaded=True, debug=True)
