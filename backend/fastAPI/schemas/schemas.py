from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    status: str
    last_seen: datetime
    
    class Config:
        orm_mode = True

class MessageCreate(BaseModel):
    content: Optional[str] = None
    group_id: Optional[int] = None

class Message(BaseModel):
    id: int
    content: str
    file_url: Optional[str]
    sender_id: int
    group_id: Optional[int]
    timestamp: datetime
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str