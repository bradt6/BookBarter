import jwt
from flask import request;

global secret_jwt_key
secret_jwt_key = 'this is a super secret key and should not be made publically assesable anywhere'

def check_admin(f):
    def returned_function(*args):
        token = request.headers.get('Authorization');
        if (token):
            token_decoded = jwt.decode(token, secret_jwt_key) 
            if (token_decoded.get('username','') == 'admin'):
                return f(*args);
        return {'result': False, 'error': 'Authorization token incorrect'}
    return returned_function;

def check_auth(f):
    def returned_function(*args):
        token = request.headers.get('Authorization');
        if (token):
            token_decoded = jwt.decode(token, secret_jwt_key) 
            if (token_decoded.get('username','') != ''):
                return f(*args);
        return {'result': False, 'error': 'Authorization token incorrect'}
    return returned_function;
