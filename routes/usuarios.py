from utils.responses import api_response
from utils.decorators import roles_required
from flask import Blueprint, request
from flask_login import login_required, current_user
from repositories.usuario_repository import UsuarioRepository

usuarios_bp = Blueprint('usuarios_bp', __name__)

@usuarios_bp.route('/registrarUsuario', methods=['POST'])
@login_required
@roles_required("Administrador", "Supervisor")
def registrar_usuario():

    datos = request.json

    try:
        
        UsuarioRepository.registrarUsuario(datos)

        return api_response(
            True,
            'success',
            'Usuario registrado',
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            'exception',
            str(e.msg),
            None
        )
        
@usuarios_bp.route('/obtenerUsuarios', methods=['GET'])
@login_required
@roles_required("Administrador", "Supervisor")
def obtener_usuarios():

    try:

        usuarios = UsuarioRepository.obtenerUsuarios()

        if usuarios == None:
            return api_response(
                False,
                'error',
                'No hay usuarios registrados',
                None
            )
     
        return api_response(
            True,
            'success',
            'Usuarios obtenidos',
            usuarios
        )
    
    except Exception as e:
        return api_response(
            False,
            'exception',
            str(e.msg),
            None
        )

@usuarios_bp.route('/eliminarUsuario', methods=['DELETE'])
@login_required
@roles_required("Administrador")
def eliminar_usuario():
    
    cedula = request.args.get('cedula')

    try:

        UsuarioRepository.eliminarUsuario(cedula)

        return api_response(
            True,
            'success',
            'Usuario eliminado',
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            'exception',
            str(e.msg),
            None
        )
    
@usuarios_bp.route('/buscarUsuario', methods=['GET'])
@login_required
@roles_required("Administrador", "Supervisor")
def buscar_usuario():
    
    cedula = request.args.get('cedula')

    try:

        usuario = UsuarioRepository.buscarUsuario(cedula)

        if usuario == None:
            return api_response(
                False,
                'error',
                'Usuario no encontrado',
                None
            )
        
        return api_response(
            True,
            'success',
            'Usuario encontrado',
            usuario
        )
    
    except Exception as e:
        return api_response(
            False,
            'exception',
            str(e.msg),
            None
        )

@usuarios_bp.route('/actualizarUsuario', methods=['PUT'])
@login_required
@roles_required("Administrador")
def actualizar_usuario():
    
    usuarioId = request.args.get('id')
    datosActualizados = request.json

    try:

        UsuarioRepository.actualizarUsuario(datosActualizados, usuarioId)

        return api_response(
            True,
            'success',
            'Usuario actualizado',
            None
        )

    except Exception as e:
        return api_response(
            False,
            'exception',
            str(e.msg),
            None
        )

@usuarios_bp.route('/usuarioActual', methods=['GET'])
@login_required
def usuario_actual():
    
    return api_response(
        True,
        '',
        '',
        {
            "usuario": current_user.usuario,
            "cargo": current_user.cargo
        }
    )
