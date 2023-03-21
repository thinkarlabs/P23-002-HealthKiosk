import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, BaseSettings


class User(BaseModel):
    number: int
    otp: int
    h_pass: str
    created_at: datetime | None = None
    updated_at: datetime | None = None

    
class Profile(BaseModel):
    #id: str = Field(default_factory=uuid.uuid4, alias="_id")
    profile_name: str = Field(...)
    profile_pic: str = Field(...)
    profile_gender: str = Field(...)
    profile_age: int = Field(...)


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


class ProfileItems(BaseModel):
    number: int
    profiles: list[Profile] | None = None

class Episodes(BaseModel):
    """
    """
    pass

class websockettest(BaseModel):
    #id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(...)