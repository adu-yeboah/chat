from sqlalchemy import  Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from config.db import Base
import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    status = Column(String, default="offline")
    last_seen = Column(DateTime, default=datetime.datetime.utcnow)
    
    messages = relationship("Message", back_populates="sender")
    groups = relationship("GroupMember", back_populates="user")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    file_url = Column(String, nullable=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    sender = relationship("User", back_populates="messages")
    group = relationship("Group", back_populates="messages")

class Group(Base):
    __tablename__ = "groups"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    creator_id = Column(Integer, ForeignKey("users.id"))
    
    messages = relationship("Message", back_populates="group")
    members = relationship("GroupMember", back_populates="group")

class GroupMember(Base):
    __tablename__ = "group_members"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    group_id = Column(Integer, ForeignKey("groups.id"))
    
    user = relationship("User", back_populates="groups")
    group = relationship("Group", back_populates="members")