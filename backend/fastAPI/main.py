from fastapi import FastAPI
from api.v1 import users, chats, groups, auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(chats.router)
app.include_router(groups.router)