import random
import os
import json
from datetime import datetime, timedelta
from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models import Otp, Phone, UserOtp, Profile, User, UserResponse, ChatText, ProfileItems
from app.oauth2 import AuthJWT
from . import utils
from . import oauth2
from  app.chat import get_response

router = APIRouter()


@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=Otp)
def create_user(request: Request, payload: Phone = Body(...)):
    otp = random.randint(100000,999999) #12
    print("Your OTP is - ",otp)
    c_code = "+91"
    verified_number = c_code + str(payload.number)
    """try:
        message = request.app.client.messages.create(
            body='Secure Device OTP is - ' + str(otp) + 'Dont share it.',
            from_=request.app.twilio_number,
            to=verified_number
        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Twilio Otp Connection Error!')"""
    new_project = request.app.database["patient"].find_one({'number': payload.number}) #dict
    if new_project:
        new_project['updated_at'] = datetime.utcnow()
        new_project['h_pass'] =  utils.hash_password(otp)
        new_project['otp'] = otp+64
        new_project = request.app.database["patient"].find_one_and_update({'number': payload.number}, {"$set": new_project}) #dict
        
    else:
        created_at= datetime.utcnow()
        user_dict = {
            'number' : payload.number,
            'created_at' : created_at,
            'updated_at': created_at,
            'h_pass' : utils.hash_password(otp),
            'otp' : otp+64
        }
        new_project = request.app.database["patient"].insert_one(user_dict) #pymongo object
    return {'condition': True}


@router.post('/login')
def login(request: Request, payload: Phone, response: Response, Authorize: AuthJWT = Depends()):
    # Check if the user exist
    ACCESS_TOKEN_EXPIRES_IN =  int(request.app.ACCESS_TOKEN_EXPIRES_IN)
    REFRESH_TOKEN_EXPIRES_IN =  int(request.app.REFRESH_TOKEN_EXPIRES_IN)
    otp = payload.number + 64
    new_project = request.app.database["patient"].find_one({'otp': otp})

    if not new_project:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='Invalid OTP')

    # Check if the password is valid
    if not utils.verify_password(payload.number, new_project['h_pass']):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Incorrect Otp or Phone number')
    # Create access token
    access_token = Authorize.create_access_token(
        subject=str(new_project["number"]), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
    # Create refresh token
    refresh_token = Authorize.create_refresh_token(
        subject=str(new_project["number"]), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))
    # Store refresh and access tokens in cookie
    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token,
                        REFRESH_TOKEN_EXPIRES_IN * 60, REFRESH_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')

    # Send both access
    # Python code to illustrate with() alongwith write()
    #import pdb;pdb.set_trace()
    if new_project.get('profile', None): #new_project['profile']:
        data = { "header": "Applicants", "profiles": new_project['profile'], "empty": False}
        profiles = new_project['profile']
    else:
        data = {}
        profiles = []
    """   
    path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),'static','data', 'profiles.txt')
    with open(path, "w") as f:
        f.write(json.dumps(data, indent=4))"""
    
    return {'profile': profiles, 'access_token': access_token}


@router.get('/me', response_model=UserResponse)
def get_me(request: Request, user_id: str = Depends(oauth2.require_user)):
    new_project = request.app.database["patient"].find_one({'number':int(user_id)})
    #user = userResponseEntity(User.find_one({'_id': ObjectId(str(user_id))}))
    return {"status": "success", "user": new_project}


@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), user_id: str = Depends(oauth2.require_user)):
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)
    return {'status': 'success'}

#user_id: str = Depends(oauth2.require_user)
@router.post("/predict", status_code=status.HTTP_200_OK, response_model=ChatText)
def predict(request: Request, chat: ChatText):
    #text = request.get_json().get("message")  # TODO: check if text is valid
    response = get_response(chat.chat)
    message = {"chat": response}
    return message


@router.post("/profile")
def add_profile(request: Request,response: Response, profile: Profile, user_id: str = Depends(oauth2.require_user)):
    #import pdb;pdb.set_trace()
    project = request.app.database["patient"].update_one({ 'number': int(user_id) }, 
    { '$push': { 
        'profile': {
            "profile_name": profile.profile_name,
            "profile_pic": profile.profile_pic,
            "profile_age": profile.profile_age,
            "profile_gender": profile.profile_gender
        }
    }}
    )

    new_project = request.app.database["patient"].find_one({'number':int(user_id)})
    if new_project['profile']:
        data = new_project['profile']
    else:
        data = []
    return {'profile': data}
    """path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),'static','data', 'profiles.txt')
    with open(path, "w") as f:
        f.write(json.dumps(data, indent=4))
    return {'condition': True}
    """

#from typing import List
#@router.get("/profile", status_code=status.HTTP_200_OK, response_model=List[Profile])
@router.get("/profile")
def get_profiles(request: Request,response: Response,  user_id: str = Depends(oauth2.require_user)):
    new_project = request.app.database["patient"].find_one({'number':int(user_id)})
    if new_project.get('profile', None):
        data = new_project['profile']
    else:
        data = []
    #import pdb;pdb.set_trace()
    return {'profile': data}



@router.get("/sun")
def get_profiles(request: Request,response: Response):
    
    return "Hello World!!!"



@router.post('/register1')
def create_user(request: Request, response: Response, payload: Phone = Body(...)):
    otp = random.randint(100000,999999) #12
    print("Your OTP is - ",otp)
    c_code = "+91"
    verified_number = c_code + str(payload.number)
    """try:
        message = request.app.client.messages.create(
            body='Secure Device OTP is - ' + str(otp) + 'Dont share it.',
            from_=request.app.twilio_number,
            to=verified_number
        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Twilio Otp Connection Error!')"""
    new_project = request.app.database["patient"].find_one({'number': payload.number}) #dict
    if new_project:
        new_project['updated_at'] = datetime.utcnow()
        new_project['h_pass'] =  utils.hash_password(otp)
        new_project['otp'] = otp+64
        new_project = request.app.database["patient"].find_one_and_update({'number': payload.number}, {"$set": new_project}) #dict
        
    else:
        created_at= datetime.utcnow()
        user_dict = {
            'number' : payload.number,
            'created_at' : created_at,
            'updated_at': created_at,
            'h_pass' : utils.hash_password(otp),
            'otp' : otp+64
        }
        new_project = request.app.database["patient"].insert_one(user_dict) #pymongo object
    return {'phone': verified_number, 'otp': otp }
