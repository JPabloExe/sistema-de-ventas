from flask import Blueprint, request, jsonify
from entities.venta import Venta
from repositories.venta_repository import VentaRepository
from utils.responses import api_response
import json

ventas_bp = Blueprint('ventas_bp', __name__)

@ventas_bp.route('/obtenerInformeVentas', methods=['GET'])
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
def realizar_venta():
    productosComprados = request.get_json()
    
    try:   

        productos_json = json.dumps(productosComprados)
        
        nuevaVenta = Venta('Efectivo', productos_json) 
        
        VentaRepository.realizarVenta(nuevaVenta)
        
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
        
@ventas_bp.route('/obtenerVentas', methods=['POST'])
def obtener_ventas():
    intervalo = request.get_json()

    try:
        ventas = VentaRepository.obtenerVentas(intervalo['inicial'], intervalo['final'])
        
        if ventas == 0:
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
    
@ventas_bp.route('/eliminarVenta', methods=['POST'])
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
