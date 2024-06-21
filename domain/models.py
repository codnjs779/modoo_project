from sqlalchemy import Column, Integer, String
from .database import Base


class JobList(Base):
    __tablename__ = 'jobList'

    id = Column(Integer, primary_key=True)
    company = Column(String, nullable=True)
    cntctNo = Column(String,nullable=True)
    compAddr = Column(String, nullable=False)
    empType = Column(String, nullable=True)
    enterType = Column(String, nullable=True)
    envBothHands = Column(String, nullable=True)
    envEyesight = Column(String, nullable=True)
    envHandWork = Column(String, nullable=True)
    envLiftPower = Column(String, nullable=True)
    envLstnTalk = Column(String, nullable=True)
    envStndWalk = Column(String, nullable=True)
    jobNm = Column(String, nullable=True)
    termDate = Column(String, nullable=True)
    reqCareer = Column(String, nullable=True)
    reqEduc = Column(String, nullable=True)
    rno = Column(String, nullable=True)
    salary = Column(String, nullable=True)
    salaryType = Column(String, nullable=True)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

