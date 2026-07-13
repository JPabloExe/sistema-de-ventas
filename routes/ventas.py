from flask import Blueprint, request
from flask_login import login_required
from repositories.venta_repository import VentaRepository
from utils.responses import api_response
import json

ventas_bp = Blueprint('ventas_bp', __name__)

@ventas_bp.route('/obtenerInformeVentas', methods=['GET'])
@login_required
def informe_ventas():
    
    try:

        informe = VentaRepository.obtenerInforme()
        
        if informe == None:
            return api_response(
                False,
                "error",
                "Error al obtener informe de ventas",
                None
            )
        else:
            return api_response(
                True,
                "success",
                "Informe de ventas cargado",
                informe
            )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@ventas_bp.route('/realizarVenta', methods=['POST'])
@login_required
def realizar_venta():
    
    productosComprados = request.get_json()
    
    try:   

        productos_json = json.dumps(productosComprados)
        
        VentaRepository.realizarVenta({
            "metodo": "Efectivo",
            "items": productos_json,
        })
        
        return api_response(
            True,
            "success",
            "Venta completada",
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
        
@ventas_bp.route('/obtenerVentas', methods=['GET'])
@login_required
def obtener_ventas():

    try:
        ventas = VentaRepository.obtenerVentas()
        
        if ventas == None:
            return api_response(
                False,
                "error",
                "No hay ventas registradas",
                None
            )
        else:
            return api_response(
            True,
            "success",
            "Ventas encontradas",
            ventas
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@ventas_bp.route('/buscarVentas', methods=['GET'])
@login_required
def buscar_ventas():
    
    fechaInicial = request.args.get('inicial') or None
    fechaFinal = request.args.get('final') or None

    try:
        ventas = VentaRepository.buscarVentas(fechaInicial, fechaFinal)
        
        if ventas == None:
            return api_response(
                False,
                "error",
                "Ventas no encontradas",
                None
            )
        else:
            return api_response(
            True,
            "success",
            "Ventas encontradas",
            ventas
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
        
@ventas_bp.route('/buscarDetalles', methods=['GET'])
@login_required
def buscar_detalles():
    
    numero = request.args.get('numero')
    
    try:
        items = VentaRepository.buscarDetalles(numero)
        
        return api_response(
            True,
            "success",
            "",
            items            
        )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
        
@ventas_bp.route('/eliminarVenta', methods=['DELETE'])
@login_required
def eliminar_venta():
    
    numero = request.args.get('numero')
    
    try:
        VentaRepository.eliminarVenta(numero)
        return api_response(
            True,
            "success",
            "Venta eliminada",
            None
        )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
