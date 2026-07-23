from utils.responses import api_response
from utils.decorators import roles_required
from flask import Blueprint, request
from flask_login import login_required, current_user
from repositories.proveedores_repository import ProveedoresRepository
import json

proveedores_bp = Blueprint('proveedores_bp', __name__)

@proveedores_bp.route('/registrarProveedor', methods=['POST'])
@login_required
@roles_required('Administrador', 'Supervisor')
def registrar_proveedor():

    datos = request.get_json()

    try:
        ProveedoresRepository.registrarProveedor({
            'nombre': datos['nombre'],
            'nit': datos['nit'],
            'telefono': datos['telefono'],
            'correo': datos['correo'],
            'direccion': datos['direccion'],
            'ciudad': datos['ciudad'],
            'estado': datos['estado']
        })

        return api_response(
            True,
            "success",
            "Proveedor registrado correctamente",
            None
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@proveedores_bp.route('/actualizarProveedor', methods=['PUT'])
@login_required
@roles_required('Administrador', 'Supervisor')
def actualizar_proveedor():
    
    proveedor_id = request.args.get('id')
    datos = request.get_json()

    try:
        ProveedoresRepository.actualizarProveedor({
            'id': proveedor_id,
            'nombre': datos['nombre'],
            'nit': datos['nit'],
            'telefono': datos['telefono'],
            'correo': datos['correo'],
            'direccion': datos['direccion'],
            'ciudad': datos['ciudad'],
            'estado': datos['estado']
        })

        return api_response(
            True,
            "success",
            "Proveedor actualizado",
            None
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@proveedores_bp.route('/obtenerProveedores', methods=['GET'])
@login_required
@roles_required('Administrador', 'Supervisor')
def obtener_proveedores():
    
    try:

        proveedores = ProveedoresRepository.obtenerProveedores()

        return api_response(
            True,
            "success",
            "Proveedores obtenidos",
            proveedores
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )