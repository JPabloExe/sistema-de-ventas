from utils.responses import api_response
from utils.decorators import roles_required
from flask import Blueprint, request
from flask_login import login_required, current_user
from repositories.compras_repository import ComprasRepository
import json

compras_bp = Blueprint('compras_bp', __name__)

@compras_bp.route('/realizarCompra', methods=['POST'])
@login_required
@roles_required('Administrador', 'Supervisor')
def realizar_compra():

    datos = request.get_json()

    try:
    
        productos_json = json.dumps(datos['productos'])

        ComprasRepository.realizarCompra({
            'proveedor': datos['proveedor'] or None,
            'usuario': current_user.id,
            'metodo': datos['metodo_pago'] or None,
            'productos': productos_json
        })

        return api_response(
            True,
            "success",
            "Compra realizada",
            None
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )


@compras_bp.route('/obtenerCompras')
@login_required
@roles_required('Administrador', 'Supervisor')
def obtener_compras():

    try:

        compras = ComprasRepository.obtenerCompras()

        return api_response(
            True,
            "success",
            "Compras obtenidas",
            compras
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e),
            None
        )

@compras_bp.route('/obtenerDetalles', methods=['GET'])
@login_required
@roles_required('Administrador', 'Supervisor')
def obtener_detalles():

    id_compra = request.args.get('id_compra')

    try:

        detalles = ComprasRepository.obtenerDetalles(id_compra)

        return api_response(
            True,
            "success",
            "",
            detalles
        )

    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e),
            None
        )

@compras_bp.route('/obtenerMetodosPago', methods=['GET'])
@login_required
def obtener_metodos_pago():
    
    try:

        metodos = ComprasRepository.obtenerMetodosPago()
        
        if len(metodos) == 0:
            return api_response(
                False, 
                "error", 
                "No hay metodos de pago registrados",
                None
            ) 
        else:
            return api_response(
                True,
                "",
                "",
                metodos
            ) 
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e),
            None
        ) 