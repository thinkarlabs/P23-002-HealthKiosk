import random
import os
import json
from bson import json_util
from datetime import datetime, timedelta
from fastapi import APIRouter, Body, Request, Form,\
    Response, HTTPException, status, Depends,  WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from typing import List
from bson.objectid import ObjectId
from app.models import Otp, Phone, UserOtp, Profile, User, UserResponse, ChatText, ProfileItems, websockettest, ProfileId, Episodes
from app.oauth2 import AuthJWT
from . import utils
from . import oauth2
from  app.chat import get_response, get_transcript_summary

router = APIRouter()


@router.post('/register')
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
    new_project = request.app.database["mobile"].find_one({'number': payload.number}) #dict
    if new_project:
        new_project['updated_at'] = datetime.utcnow()
        new_project['h_pass'] =  utils.hash_password(otp)
        new_project['otp'] = otp+64
        new_project = request.app.database["mobile"].find_one_and_update({'number': payload.number}, {"$set": new_project}) #dict
        
    else:
        created_at= datetime.utcnow()
        user_dict = {
            'number' : payload.number,
            'created_at' : created_at,
            'updated_at': created_at,
            'h_pass' : utils.hash_password(otp),
            'otp' : otp+64
        }
        new_project = request.app.database["mobile"].insert_one(user_dict) #pymongo object
    return {'phone': verified_number, 'otp': otp }


@router.post('/login')
def login(request: Request, payload: Phone, response: Response, Authorize: AuthJWT = Depends()):
    # Check if the user exist
    ACCESS_TOKEN_EXPIRES_IN =  int(request.app.ACCESS_TOKEN_EXPIRES_IN)
    REFRESH_TOKEN_EXPIRES_IN =  int(request.app.REFRESH_TOKEN_EXPIRES_IN)
    otp = payload.number + 64
    new_project = request.app.database["mobile"].find_one({'otp': otp})

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
    
    if new_project.get('profile', None): #new_project['profile']:
        data = { "header": "Applicants", "profiles": new_project['profile'], "empty": False}
        profiles = new_project['profile']
    else:
        data = {}
        profiles = []

    return {'profile': profiles, 'access_token': access_token}


@router.get("/profile")
def get_profiles(request: Request, response: Response,  user_id: str = Depends(oauth2.require_user)):
    new_project = request.app.database["profile"].find({'number':int(user_id)})
    response = json.loads(json_util.dumps(new_project))
    return {'profile': response}


@router.post("/profile")
def add_profile(request: Request,response: Response, profile: Profile, user_id: str = Depends(oauth2.require_user)):
    user_dict = {
            'number' : int(user_id),
            "profile_name": profile.profile_name,
            "profile_pic": profile.profile_pic,
            "profile_age": profile.profile_age,
            "profile_gender": profile.profile_gender
        }
    new_project = request.app.database["profile"].insert_one(user_dict) #pymongo object
    new_project = request.app.database["profile"].find({'number':int(user_id)})
    response = json.loads(json_util.dumps(new_project))
    return {'profile': response}


@router.post("/oneprofile")
def get_profiles(request: Request, response: Response, profile_id: ProfileId):
    new_project =request.app.database["profile"].find_one({'_id':ObjectId(profile_id.id)})
    response = json.loads(json_util.dumps(new_project))
    return {'profile': response}


@router.post("/episode")
def get_profiles(request: Request, response: Response, chat: ChatText ):
    new_project = request.app.database["mobile"].find_one({'number':123})
    #import pdb;pdb.set_trace()
    if new_project.get('profile', None):
        data = new_project['profile']
    else:
        data = []
    return {'profile': data}


#user_id: str = Depends(oauth2.require_user)
@router.post("/predict", status_code=status.HTTP_200_OK, response_model=ChatText)
def predict(request: Request, chat: ChatText):
    #text = request.get_json().get("message")  # TODO: check if text is valid
    response = get_response(chat.chat)
    message = {"chat": response}
    return message


#user_id: str = Depends(oauth2.require_user)
@router.post("/summary", status_code=status.HTTP_200_OK, response_model=ChatText)
def summary(request: Request, chat: Episodes):
    #text = request.get_json().get("message")  # TODO: check if text is valid
    response = get_transcript_summary(chat.chat)
    message = {"chat": response}
    created_at= datetime.utcnow()
    project = request.app.database["profile"].update_one({'_id':ObjectId(chat.id)}, 
    { '$push': { 
        'episodes': {
            'created_at' : created_at.strftime('%B %d %Y - %H:%M:%S'),
            "summary": response
        }
    }}
    )

    return message


@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), user_id: str = Depends(oauth2.require_user)):
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)
    return {'status': 'success'}


@router.post("/testuser")
def register_user(request: Request, response: Response, user: websockettest):  
    response.set_cookie(key="X-Authorization", value=user.username, httponly=True)

"""@app.post("/api/register")
def register_user(request: Request, response: Response, user: RegisterValidator):
 
    response.set_cookie(key="X-Authorization", value=user.username, httponly=True)"""


class SocketManager:
    def __init__(self):
        self.active_connections: List[(WebSocket, str)] = []

    async def connect(self, websocket: WebSocket, user: str):
        await websocket.accept()
        self.active_connections.append((websocket, user))

    def disconnect(self, websocket: WebSocket, user: str):
        self.active_connections.remove((websocket, user))

    async def broadcast(self, data: dict):
        for connection in self.active_connections:
            await connection[0].send_json(data)


manager = SocketManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")

@router.websocket("/api/chat")
async def chat(websocket: WebSocket):
    #import pdb;pdb.set_trace()
    sender = "sunil" #websocket.cookies.get("X-Authorization")

    if sender:
        await manager.connect(websocket, sender)
        response = {
            "sender": sender,
            "message": "got connected"
        }
        await manager.broadcast(response)
        try:
            while True:
                data = await websocket.receive_json()
                await manager.broadcast(data)
        except WebSocketDisconnect:
            manager.disconnect(websocket, sender)
            response['message'] = "left"
            await manager.broadcast(response)

