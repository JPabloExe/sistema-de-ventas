from flask_login import LoginManager
from models.usuario_login import Usuario
from repositories.usuario_repository import UsuarioRepository

login_manager = LoginManager()

login_manager.login_view = "paginas_bp.login"

@login_manager.user_loader
def cargar_usuario(id):

    datos = UsuarioRepository.buscarUsuarioPorID(id)

    if datos:
        return Usuario(datos)

    return None