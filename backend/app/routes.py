from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List


from app.models import Otp, Phone, UserOtp


router = APIRouter()


@router.post("/user12", response_description="user request", status_code=status.HTTP_201_CREATED, response_model=UserOtp)
def send_otp(request: Request, project: UserOtp = Body(...)):
    #import pdb;pdb.set_trace()
    user = request.app.database["patient"].find_one({'number': project.number})
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='Account already exist')
    project = jsonable_encoder(project)
    phone_number =  project['number']
    new_project = request.app.database["patient"].insert_one(project)
    created_project = request.app.database["patient"].find_one(
        {"_id": new_project.inserted_id}
    )

    return created_project
    
    #return {'condition': True}


@router.post("/phone_verification", response_description="OTP request", status_code=status.HTTP_201_CREATED, response_model=Otp)
def send_otp(request: Request, project: Phone = Body(...)):
    #import pdb;pdb.set_trace()
    project = jsonable_encoder(project)
    phone_number =  project['number']
    c_code = "+91"
    verified_number = c_code + phone_number  #"+9190792#####"
    #return {'condition': True}
    verification = request.app.client.verify.v2.services(request.app.verify_sid) \
        .verifications \
        .create(to=verified_number, channel="sms")
    
    return {'condition': True}


@router.post("/verify", response_description="Mobile verification", status_code=status.HTTP_201_CREATED, response_model=Otp)
def send_otp(request: Request, project: Phone = Body(...)):
    project = jsonable_encoder(project)
    token =  project['number']
    #c_code = "+91"
    #phone_number = "####"  # session.get("phone_number")
    verified_number = request.app.verified_number#c_code + phone_number  #"+919079257###"
    try:
        verification_check = request.app.client.verify.v2.services(request.app.verify_sid) \
        .verification_checks \
        .create(to=verified_number, code=token)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Project with ID  not found")
    print(verification_check.status)

    return {'condition': True}

