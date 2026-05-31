from flask import Flask
from dotenv import load_dotenv

from routes.productos import productos_bp
from routes.ventas import ventas_bp
from routes.paginas import paginas_bp
from routes.usuarios import usuarios_bp

load_dotenv()

def create_app():
    app = Flask(__name__)   

    app.register_blueprint(productos_bp)
    app.register_blueprint(ventas_bp)
    app.register_blueprint(paginas_bp)
    app.register_blueprint(usuarios_bp)
    
    return app