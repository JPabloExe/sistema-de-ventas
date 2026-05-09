from flask import Blueprint, request, jsonify
from entities.venta import Venta
from repositories.venta_repository import VentaRepository
import json

ventas_bp = Blueprint('ventas_bp', __name__)

@ventas_bp.route('/obtenerInformeVentas', methods=['GET'])
def informe_ventas():
    
    informe = VentaRepository.obtenerInforme()
    
    if informe == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "informe": informe})

@ventas_bp.route('/realizarVenta', methods=['POST'])
def realizar_venta():
    productosComprados = request.get_json()
    
    try:   

        productos_json = json.dumps(productosComprados)
        
        nuevaVenta = Venta('Efectivo', productos_json) 
        
        VentaRepository.realizarVenta(nuevaVenta)
        
        return jsonify({'mensaje': 's'})
    
    except Exception as e:
        return jsonify({'mensaje': 'n', 'excepcion': str(e)})
    
        
@ventas_bp.route('/obtenerVentas', methods=['POST'])
def obtener_ventas():
    intervalo = request.get_json()

    try:
        ventas = VentaRepository.obtenerVentas(intervalo['inicial'], intervalo['final'])
        
        if ventas == 0:
            return jsonify({'mensaje': 'n', 'error': 0})
        else:
            return jsonify({'mensaje': 's', 'ventas': ventas})
    
    except Exception as e:
        return jsonify({'mensaje': 'n', 'error': str(e)})
    
@ventas_bp.route('/eliminarVenta', methods=['POST'])
def eliminar_venta():
    numero = request.args.get('numero')
    
    try:
        VentaRepository.eliminarVenta(numero)
        return jsonify({'mensaje': 's'})
        
    except Exception as e:
        return jsonify({'mensaje': 'n', 'error': str(e)})
