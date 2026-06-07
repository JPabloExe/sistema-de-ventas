from utils.responses import api_response
from flask import Blueprint, request
from entities.usuario import Usuario
from repositories.usuario_repository import UsuarioRepository

usuarios_bp = Blueprint('usuarios_bp', __name__)

@usuarios_bp.route('/registrarUsuario', methods=['POST'])
def registrar_usuario():

    datos = request.json

    try:
        usuario = Usuario(
            datos['nombre'],
            datos['apellido'],
            datos['cedula'],
            datos['telefono'],
            datos['usuario'],
            datos['contrasena'],
            datos['id_cargo']
        )

        UsuarioRepository.registrarUsuario(usuario)

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
        else:
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