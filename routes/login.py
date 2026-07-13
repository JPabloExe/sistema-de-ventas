from utils.responses import api_response
from flask import Blueprint, request
from flask_login import login_user, logout_user, login_required
from repositories.login_repository import LoginRepository
from models.usuario_login import Usuario

login_bp = Blueprint('login_bp', __name__)

@login_bp.route("/iniciarSesion", methods=['POST'])
def iniciar_sesion():
    
    datos = request.json
    
    try:
        
        usuario = LoginRepository.iniciarSesion(datos)
        
        if usuario == None:
            return api_response(
                False,
                "exception",
                "Usuario o contraseña incorrectos",
                None
            )
        
        usuarioLogueado = Usuario(usuario)
        
        login_user(usuarioLogueado)
        
        return api_response(
            True,
            "success",
            "Inicio de sesion exitoso",
            None
        )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@login_bp.route("/cerrarSesion", methods=["POST"])
@login_required
def cerrar_sesion():
    
    try:

        logout_user()

        return api_response(
            True,
            "success",
            "Sesion cerrada",
            None
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )