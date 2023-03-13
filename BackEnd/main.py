from fastapi import FastAPI, Request, Form
from dotenv import dotenv_values
from pymongo import MongoClient
from twilio.rest import Client
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.routes import router as project_router

config = dotenv_values(".env")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mongodb_client = MongoClient(config["CONNECTION_STRING"])
app.database = app.mongodb_client[config["DB_NAME"]]
#app.database1 = app.mongodb_client['kioskprofile'] 
app.account_sid = config['YOUR_ACCOUNT_SID']
app.auth_token = config['TWILIO_AUTH_TOKEN']
app.verify_sid = config['YOUR_VERIFY_SID']
app.ACCESS_TOKEN_EXPIRES_IN = config['ACCESS_TOKEN_EXPIRES_IN']
app.REFRESH_TOKEN_EXPIRES_IN = config['REFRESH_TOKEN_EXPIRES_IN']

app.verified_number = config['SM_TO']
app.twilio_number = config['TWILIO_NUMBER']
# app.client = Client(app.account_sid, app.auth_token)

from fastapi.middleware.cors import CORSMiddleware
#from nltk import edit_distance
# "*" is for testing purposes only
# For deployment, change it to the allowed website(s)
origins = [
    "*"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)


@app.get("/")
async def index(request: Request):
  return FileResponse('static/index.html')

app.include_router(project_router)


import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
