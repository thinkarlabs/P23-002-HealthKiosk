import os
from dotenv import load_dotenv

from fastapi import FastAPI, Request, Form, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse, RedirectResponse
#from fastapi.templating import Jinja2Templates

from pymongo import MongoClient

load_dotenv()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
#app_templates = Jinja2Templates(directory="templates")

CONNECTION_STRING = os.getenv('CONNECTION_STRING')
#client = MongoClient(CONNECTION_STRING, serverSelectionTimeoutMS=5000)
#db = client['<DB_NAME']

@app.get("/")
async def index(request: Request):
  return FileResponse('static/index.html')



import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


