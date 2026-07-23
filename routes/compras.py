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
    
        items_json = json.dumps(datos['items'])

        ComprasRepository.realizar_compra({
            'proveedor': datos['id_proveedor'],
            'usuario': current_user.id,
            'factura': datos['num_factura'],
            'metodo': datos['metodo_pago'],
            'productos': items_json
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
