import requests
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from domain.database import Base, engine, get_db
from sqlalchemy.orm import Session
from domain.models import JobList, User
import os
from dotenv import load_dotenv
from requests import post
from passlib.context import CryptContext
from domain.user_schema import UserCreate, Token
from fastapi import status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from datetime import timedelta, datetime
from sqlalchemy import or_

from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

load_dotenv()
app = FastAPI()
Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "38d6a463a24b091651cb77869230c53c337d0ee1bee827c3398e03851fbe6d62"
ALGORITHM = "HS256"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 프론트엔드 서버의 주소
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# APScheduler를 사용하여 백그라운드 스케줄러 생성
scheduler = BackgroundScheduler()

# 매일 00:00에 fetchdata 엔드포인트 호출하는 작업 추가
scheduler.add_job(lambda: post("http://3.38.20.184:8000/fetchdata"), "cron", hour=00, minute=00)

# # 스케줄러 시작
scheduler.start()


@app.post("/fetchdata")
def fetch_data(db: Session = Depends(get_db)):
    db.query(JobList).delete()
    origins = "http://apis.data.go.kr/B552583/job/job_list_env?"
    api_key = os.getenv("API_KEY")
    pn = 1
    row = 400

    url = f"{origins}serviceKey={api_key}&pageNo={pn}&numOfRows={row}&_type=json"

    response = requests.get(url)
    data = response.json()
    entries = data["response"]["body"]["items"]["item"]
    for entry in entries:
        api_entry = JobList(
            company=entry.get('busplaName', ''),
            cntctNo=entry.get('cntctNo', ''),
            compAddr=entry.get('compAddr', ''),
            empType=entry.get('empType', ''),
            enterType=entry.get('enterType', ''),
            envBothHands=entry.get('envBothHands', ''),
            envEyesight=entry.get('envEyesight', ''),
            envHandWork=entry.get('envHandWork', ''),
            envLiftPower=entry.get('envLiftPower', ''),
            envLstnTalk=entry.get('envLstnTalk', ''),
            envStndWalk=entry.get('envStndWalk', ''),
            jobNm=entry.get('jobNm', ''),
            termDate=entry.get('termDate', ''),
            reqCareer=entry.get('reqCareer', ''),
            reqEduc=entry.get('reqEduc', ''),
            rno=entry.get('rno', ''),
            salary=entry.get('salary', ''),
            salaryType=entry.get('salaryType', '')
        )
        db.add(api_entry)
    db.commit()
    return {"msg": "data fetched and stored successfully"}


@app.get("/joblist")
def read_job_list(page: int = 1, limit: int = 20, db: Session = Depends(get_db)):
    if page < 1:
        raise HTTPException(status_code=400, detail="페이지 숫자는 1보다 커야함")
    skip = (page - 1) * limit
    total_count = db.query(JobList).count()
    jobs = db.query(JobList).offset(skip).limit(limit).all()

    return {
        "total_count": total_count,
        "page": page,
        "limit": limit,
        "jobs": jobs
    }


@app.get("/joblist/{id}")
def read_detail_job(id: int, db: Session = Depends(get_db)):
    job = db.query(JobList).filter(JobList.id == id).first()
    return job


@app.get("/joblist/region/{location}")
def read_region(location: str, db: Session = Depends(get_db)):
    job = db.query(JobList).filter(JobList.compAddr.like(f"%{location}%")).all()
    return job


# @app.get("/joblist/body/{bodyEnv}")
# def read_job_bodyEnv(bodyEnv: str, db: Session = Depends(get_db)):

# 중복 id
def get_existing_user(user_create: UserCreate, db: Session = Depends(get_db)):
    return db.query(User).filter(
        or_(User.username == user_create.username, User.email == user_create.email)
    ).first()


@app.post("/create", status_code=status.HTTP_204_NO_CONTENT)
def create_user(user_create: UserCreate, db: Session = Depends(get_db)):
    user = get_existing_user(user_create, db)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='이미 존재하는 사용자입니다.')

    db_user = User(username=user_create.username,
                   password=pwd_context.hash(user_create.password1),
                   email=user_create.email)
    db.add(db_user)
    db.commit()



def get_user(username: str, db: Session = Depends(get_db)):
    return db.query(User).filter(User.username == username).first()


@app.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                           db: Session = Depends(get_db)):
    user = get_user(form_data.username, db)
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    data = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username
    }



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)


app.mount("/static", StaticFiles(directory="frontend/build/static"))
@app.get("/")
def index():
    return FileResponse("frontend/build/static/index.html")