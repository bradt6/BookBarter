import jwt
from flask import request;

global secret_jwt_key
secret_jwt_key = 'this is a super secret key and should not be made publically assesable anywhere'

def check_auth(f):
    def returned_function(*args):
        token = request.headers.get('Authorization');
        if (token):
            token_decoded = jwt.decode(token, secret_jwt_key) 
            if token_decoded.get('admin',False):
                f(*args);
    return returned_function;

