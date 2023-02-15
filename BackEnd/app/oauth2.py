import base64
from typing import List
from fastapi import Depends, HTTPException, status
from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel
from bson.objectid import ObjectId

#from app.serializers.userSerializers import userEntity

#from .database import User
#from app.models import settings
import os
from dotenv import load_dotenv
load_dotenv()
#os.getenv('CONNECTION_STRING')

class Settings(BaseModel):
    authjwt_algorithm: str = os.getenv('JWT_ALGORITHM')
    authjwt_decode_algorithms: List[str] = [os.getenv('JWT_ALGORITHM')]
    authjwt_token_location: set = {'cookies', 'headers'}
    authjwt_access_cookie_key: str = 'access_token'
    authjwt_refresh_cookie_key: str = 'refresh_token'
    authjwt_cookie_csrf_protect: bool = False
    authjwt_public_key: str = base64.b64decode(
        os.getenv('JWT_PUBLIC_KEY')).decode('utf-8')
    authjwt_private_key: str = base64.b64decode(
        os.getenv('JWT_PRIVATE_KEY')).decode('utf-8')


@AuthJWT.load_config
def get_config():
    return Settings()


class NotVerified(Exception):
    pass


class UserNotFound(Exception):
    pass


def require_user(Authorize: AuthJWT = Depends()):
    try:
        #import pdb;pdb.set_trace()
        from pymongo import MongoClient
        mongodb_client = MongoClient(os.getenv('CONNECTION_STRING'))
        database = mongodb_client[os.getenv('DB_NAME')]
        #request.app.database["patient"].find_one({'otp': otp})
        Authorize.jwt_required()
        user_id = Authorize.get_jwt_subject()
        user = database["patient"].find_one({'number': int(user_id)})#userEntity(User.find_one({'_id': ObjectId(str(user_id))}))

        if not user:
            raise UserNotFound('User no longer exist')

        #if not user["verified"]:
        #    raise NotVerified('You are not verified')

    except Exception as e:
        error = e.__class__.__name__
        print(error)
        if error == 'MissingTokenError':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='You are not logged in')
        if error == 'UserNotFound':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='User no longer exist')
        if error == 'NotVerified':
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='Please verify your account')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='Token is invalid or has expired')
    return user_id
