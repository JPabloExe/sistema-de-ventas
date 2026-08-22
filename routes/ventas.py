from utils.responses import api_response, obtener_mensaje_mysql
from utils.decorators import roles_required
from flask import Blueprint, request
from flask_login import login_required, current_user
from repositories.venta_repository import VentaRepository
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@ventas_bp.route('/realizarVenta', methods=['POST'])
@login_required
@roles_required("Administrador", "Supervisor", "Empleado")
def realizar_venta():
    
    datosVenta = request.get_json()
    
    try:   

        items_json = json.dumps(datosVenta["items"])
        
        VentaRepository.realizarVenta({
            "id_usuario": current_user.id,
            "metodo": datosVenta["metodo"],
            "items": items_json
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
            "error",
            obtener_mensaje_mysql(e),
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
                "No se han registrado ventas",
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
            "error",
            obtener_mensaje_mysql(e),
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )
        
@ventas_bp.route('/obtenerDetallesVenta', methods=['GET'])
@login_required
@roles_required("Administrador", "Supervisor")
def obtener_detalles_ventas():
    
    numero = request.args.get('numero')
    
    try:
        items = VentaRepository.obtenerDetalles(numero)
        
        return api_response(
            True,
            "success",
            "",
            items            
        )
        
    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        )
        
@ventas_bp.route('/eliminarVenta', methods=['DELETE'])
@login_required
@roles_required("Administrador")
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@ventas_bp.route('/obtenerVentasHoy', methods=['GET'])
@login_required
@roles_required("Administrador", "Supervisor")
def obtener_ventas_hoy():
    
    try:
        ventas = VentaRepository.obtenerVentasHoy()
        
        if ventas == None:
            return api_response(
                False,
                "error",
                "No se han realizado ventas hoy",
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )
