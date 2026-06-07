from database.dbConect import Base, Session,session
from sqlalchemy import create_engine, Column, String, Integer

class User(Base):
    __tablename__="usuarios"

    id =Column("id",Integer,primary_key=True,autoincrement=True)
    nombre=Column("nombre",String)



