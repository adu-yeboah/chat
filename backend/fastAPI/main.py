from fastapi import FastAPI, Depends, WebSocket, UploadFile, File, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Dict
import aiofiles # type: ignore
from datetime import datetime
from config.db import get_db, Base, engine
from models.models import User, Message, Group 
from schemas.schemas import UserCreate, User as UserSchema, MessageCreate, Message as MessageSchema, Token
from utils.auth import get_password_hash, verify_password, create_access_token, get_current_user
import os

app = FastAPI()
Base.metadata.create_all(bind=engine)

# WebSocket connections
active_connections: Dict[int, List[WebSocket]] = {}
typing_users: Dict[int, List[int]] = {}  # group_id: [user_ids]

@app.post("/register", response_model=UserSchema)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await websocket.accept()
    if user_id not in active_connections:
        active_connections[user_id] = []
    active_connections[user_id].append(websocket)
    
    # Update user status
    user = db.query(User).filter(User.id == user_id).first()
    user.status = "online"
    db.commit()
    
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            
            if action == "message":
                message = Message(content=data["content"], sender_id=user_id, group_id=data.get("group_id"))
                db.add(message)
                db.commit()
                await broadcast_message(message, db)
            
            elif action == "typing":
                group_id = data["group_id"]
                if group_id not in typing_users:
                    typing_users[group_id] = []
                if user_id not in typing_users[group_id]:
                    typing_users[group_id].append(user_id)
                await broadcast_typing(group_id)
            
            elif action == "stop_typing":
                group_id = data["group_id"]
                if group_id in typing_users and user_id in typing_users[group_id]:
                    typing_users[group_id].remove(user_id)
                await broadcast_typing(group_id)
                
    except Exception:
        active_connections[user_id].remove(websocket)
        user.status = "offline"
        user.last_seen = datetime.utcnow()
        db.commit()
        await broadcast_status(user_id, "offline")

async def broadcast_message(message: Message, db: Session):
    sender = db.query(User).filter(User.id == message.sender_id).first()
    message_data = {
        "id": message.id,
        "content": message.content,
        "sender_id": message.sender_id,
        "sender_username": sender.username,
        "group_id": message.group_id,
        "timestamp": str(message.timestamp)
    }
    
    if message.group_id:
        group = db.query(Group).filter(Group.id == message.group_id).first()
        for member in group.members:
            if member.user_id in active_connections:
                for ws in active_connections[member.user_id]:
                    await ws.send_json({"type": "message", "data": message_data})
    else:
        if message.sender_id in active_connections:
            for ws in active_connections[message.sender_id]:
                await ws.send_json({"type": "message", "data": message_data})

async def broadcast_typing(group_id: int):
    if group_id in typing_users:
        data = {"type": "typing", "group_id": group_id, "users": typing_users[group_id]}
        group = db.query(Group).filter(Group.id == group_id).first()
        for member in group.members:
            if member.user_id in active_connections:
                for ws in active_connections[member.user_id]:
                    await ws.send_json(data)

async def broadcast_status(user_id: int, status: str):
    data = {"type": "status", "user_id": user_id, "status": status}
    for connections in active_connections.values():
        for ws in connections:
            await ws.send_json(data)

@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    file_location = f"files/{file.filename}"
    async with aiofiles.open(file_location, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    return {"file_url": file_location}

# Video/Voice Call Signaling
@app.websocket("/call/{call_id}")
async def call_endpoint(websocket: WebSocket, call_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            # Handle WebRTC signaling messages (offer, answer, ICE candidates)
            # Broadcast to other call participants
            pass
    except Exception:
        pass

# Group management endpoints
@app.post("/groups")
def create_group(name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    group = Group(name=name, creator_id=current_user.id)
    db.add(group)
    db.commit()
    db.refresh(group)
    return group