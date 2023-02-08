import uuid
from typing import Optional
from pydantic import BaseModel, Field, BaseSettings

from datetime import datetime

"""class Project(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    start: str = Field(...)
    end: str = Field(...)
    desc: str = Field(...)

class UserBaseSchema(BaseModel):
    name: str
    email: str
    photo: str
    role: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None




class ProjectUpdate(BaseModel):
    name: Optional[str]
    start: Optional[str]
    end: Optional[str]
    desc: Optional[str]"""


class User(BaseModel):
    number: int
    otp: int
    h_pass: str
    created_at: datetime | None = None
    updated_at: datetime | None = None

    
class Profile(BaseModel):
    #id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    number: str = Field(...)
    age: str = Field(...)
    gender: str = Field(...)


class Otp(BaseModel):
    condition: bool

class Phone(BaseModel):
    number: int = Field(...)


class UserOtp(BaseModel):
    number: str = Field(...)
    otp: str = Field(...)



class Settings(BaseSettings):
    DATABASE_URL: str
    MONGO_INITDB_DATABASE: str

    JWT_PUBLIC_KEY: str
    JWT_PRIVATE_KEY: str
    REFRESH_TOKEN_EXPIRES_IN: int
    ACCESS_TOKEN_EXPIRES_IN: int
    JWT_ALGORITHM: str

    CLIENT_ORIGIN: str


class UserResponse(BaseModel):
    status: str
    user: User

class ChatText(BaseModel):
    chat: str