from utils.responses import api_response, obtener_mensaje_mysql
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
            "error",
            obtener_mensaje_mysql(e),
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@proveedores_bp.route('/eliminarProveedor', methods=['DELETE'])
@login_required
@roles_required('Administrador', 'Supervisor')
def eliminar_proveedor():
    
    proveedor_id = request.args.get('id')

    try:
        ProveedoresRepository.eliminarProveedor(proveedor_id)

        return api_response(
            True,
            "success",
            "Proveedor eliminado",
            None
        )

    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@proveedores_bp.route('/buscarProveedor', methods=['GET'])
@login_required
@roles_required('Administrador', 'Supervisor')
def buscar_proveedor():
    
    nit_proveedor = request.args.get('nit')

    try:

        proveedor = ProveedoresRepository.buscarProveedor(nit_proveedor)

        if proveedor == None:
            return api_response(
                False,
                "error",
                "Proveedor no encontrado",
                None
            ) 

        return api_response(
            True,
            "success",
            "Proveedor obtenido",
            proveedor
        )

    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@proveedores_bp.route('/obtenerProveedores', methods=['GET'])
@login_required
@roles_required('Administrador', 'Supervisor')
def obtener_proveedores():
    
    try:

        proveedores = ProveedoresRepository.obtenerProveedores()

        if proveedores == None:
            return api_response(
                False,
                "error",
                "No se han registrado proveedores",
                None
            ) 

        return api_response(
            True,
            "success",
            "Proveedores obtenidos",
            proveedores
        )

    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@proveedores_bp.route('/obtenerEstadosProveedores', methods=['GET'])
@login_required
@roles_required('Administrador', 'Supervisor')
def obtener_estados_proveedores():
    
    try:

        estados = ProveedoresRepository.obtenerEstadosProveedores()

        return api_response(
            True,
            "",
            "",
            estados
        )

    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        )