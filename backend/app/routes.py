import random
from datetime import datetime, timedelta
from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models import Otp, Phone, UserOtp, Profile, User, UserResponse, ChatText
from app.oauth2 import AuthJWT
from . import utils
from . import oauth2
from  app.chat import get_response
router = APIRouter()
#523144



@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=Otp)
def create_user(request: Request, payload: User = Body(...)):
    otp = random.randint(100000,999999)
    print("Your OTP is - ",otp)
    c_code = "+91"
    verified_number = c_code + str(payload.number)
    try:
        message = request.app.client.messages.create(
            body='Secure Device OTP is - ' + str(otp) + 'Dont share it.',
            from_=request.app.twilio_number,
            to=verified_number
        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Twilio Otp Connection Error!')
    new_project = request.app.database["patient"].find_one({'number': payload.number}) #dict
    if new_project:
        new_project['updated_at'] = datetime.utcnow()
        new_project['h_pass'] =  utils.hash_password(otp)
        new_project['otp'] = otp+64
        new_project = request.app.database["patient"].find_one_and_update({'number': payload.number}, {"$set": new_project}) #dict
        
    else:
        payload.created_at = datetime.utcnow()
        payload.updated_at = payload.created_at
        payload.h_pass = utils.hash_password(otp)
        payload.otp = otp+64
        new_project = request.app.database["patient"].insert_one(payload.dict()) #pymongo object
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
    return {'status': 'success', 'access_token': access_token}


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


@router.post("/predict", status_code=status.HTTP_200_OK, response_model=ChatText)
def predict(request: Request, chat: ChatText, user_id: str = Depends(oauth2.require_user)):
    #text = request.get_json().get("message")  # TODO: check if text is valid
    #import pdb;pdb.set_trace()
    response = get_response(chat.chat)
    message = {"chat": response}
    return message


@router.post("/profile", status_code=status.HTTP_200_OK, response_model=Otp)
def profile(request: Request, profile: Profile, user_id: str = Depends(oauth2.require_user)):
    project = request.app.database["patient"].update_one({ 'number': int(user_id) }, 
    { '$push': { 
        'profile': {
            "name": profile.name,
            "image": profile.image,
            "age": profile.age,
            "gender": profile.gender
        }
    }}
    )
    return {'condition': True}
 