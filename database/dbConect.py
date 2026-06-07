from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker


engyne= create_engine("mysql+pymysql://root:pablo2004@127.0.0.1:3306/bd_sistema_ventas",echo=True)
Session=sessionmaker(bind=engyne)
sesion=Session()
Base=declarative_base()
