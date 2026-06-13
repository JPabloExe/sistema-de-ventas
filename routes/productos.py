from utils.responses import api_response
from flask import Blueprint, request
from entities.producto import Producto
from repositories.producto_repository import ProductoRepository

productos_bp = Blueprint('productos_bp', __name__)

@productos_bp.route('/agregarProducto', methods=['POST'])
def agregar_producto():
    
    datos = request.json

    try:
        nuevo_producto = Producto(
            datos["codigo"],
            datos["nombre"],
            datos["stock"],
            datos["valor_unitario"],
            datos["costo"],
            datos["fecha_caducidad"],
            datos["categoria"]
        )
        ProductoRepository.agregarProducto(nuevo_producto)

        return api_response(
            True,
            "success",
            "Producto agregado",
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@productos_bp.route('/obtenerProductos', methods=['GET'])
def obtener_productos():
    categoria = request.args.get('categoria')
    
    try:

        productos = ProductoRepository.obtenerPorCategoria(categoria)
        
        if len(productos) == 0:
            return api_response(
                False, 
                "error", 
                "No hay productos registrados en esta categoria",
                None
            ) 
        else:
            return api_response(
                True,
                "success",
                "Inventario cargado",
                productos
            ) 
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e),
            None
        ) 
    
@productos_bp.route('/buscarProducto', methods=['POST'])
def buscar_producto():
    codigo = request.args.get('codigo')

    try:
        producto = ProductoRepository.buscarProducto(codigo)
        
        if producto == None:
            return api_response(
                False,
                "error",
                "Producto no encontrado",
                None
            )
        else:
            return api_response(
                True,
                "success",
                "Producto encontrado",
                Producto.toDict(producto)
            )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@productos_bp.route('/actualizarProducto', methods=['POST'])
def actualizar_producto():
    datos = request.json
    
    try:

        producto_actualizado = Producto(
            datos['codigo'], 
            datos['nombre'], 
            datos['stock'], 
            datos['valor_unitario'], 
            datos['costo'],
            datos['fecha_caducidad'],
            datos['categoria']
        )
        ProductoRepository.editarProducto(producto_actualizado)

        return api_response(
            True,
            "success",
            "Producto actualizado",
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@productos_bp.route('/eliminarProducto', methods=['POST'])
def eliminar_producto():
    codigo = request.args.get('codigo')

    try:

        ProductoRepository.eliminarProducto(int(codigo))

        return api_response(
            True,
            "success",
            "Producto eliminado",
            None
        )
    
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
    
@productos_bp.route('/obtenerInformeInventario', methods=['GET'])
def informe_inventario():
    
    try:

        informe = ProductoRepository.obtenerInforme()
        
        if informe == None:
            return api_response(
                False,
                "error",
                "Error al obtener informe de inventario",
                None
            )
        else:
            return api_response(
                True,
                "success",
                "Informe de inventario cargado",
                informe
            )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )
        