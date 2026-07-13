from flask import Flask
from dotenv import load_dotenv
from auth import login_manager
from config.app_config import Config

from routes.productos import productos_bp
from routes.ventas import ventas_bp
from routes.paginas import paginas_bp
from routes.usuarios import usuarios_bp
from routes.login import login_bp


load_dotenv()

def create_app():
    
    app = Flask(__name__)  
    app.config.from_object(Config) 

    app.register_blueprint(productos_bp)
    app.register_blueprint(ventas_bp)
    app.register_blueprint(paginas_bp)
    app.register_blueprint(usuarios_bp)
    app.register_blueprint(login_bp)
    
    login_manager.init_app(app)
    
    return app