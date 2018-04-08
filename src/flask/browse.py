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

#ns = api.namespace('Users', description='User operations')

#connection = mysql.connector.connect(host='localhost', 
#                                     user='root',
#                                     password='root',
#                                     database='login')
#cursor = connection.cursor(buffered=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
