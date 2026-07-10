from utils.responses import api_response
from flask import Blueprint, request
from repositories.producto_repository import ProductoRepository

productos_bp = Blueprint('productos_bp', __name__)

@productos_bp.route('/agregarProducto', methods=['POST'])
def agregar_producto():
    
    datos = request.json

    try:
        
        ProductoRepository.agregarProducto(datos)

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
        
@productos_bp.route('/crearCategoria', methods=['POST'])
def crear_categoria():
    
    categoria = request.json
    
    try:
        
        ProductoRepository.crearCategoria(categoria)
        
        return api_response(
            True,
            "success",
            "Categoria Creada",
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
                "No hay productos registrados",
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
                producto
            )
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e.msg),
            None
        )

@productos_bp.route('/actualizarProducto', methods=['PUT'])
def actualizar_producto():
    
    datos = request.json
    
    try:

        ProductoRepository.editarProducto(datos)

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

@productos_bp.route('/eliminarProducto', methods=['DELETE'])
def eliminar_producto():
    codigo = request.args.get('codigo')

    try:

        ProductoRepository.eliminarProducto(codigo)

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

@productos_bp.route('/obtenerCategorias', methods=['GET'])
def obtener_categorias():
    
    
    try:

        categorias = ProductoRepository.obtenerCategorias()
        
        if len(categorias) == 0:
            return api_response(
                False, 
                "error", 
                "No hay categorias registradas",
                None
            ) 
        else:
            return api_response(
                True,
                "",
                "",
                categorias
            ) 
        
    except Exception as e:
        return api_response(
            False,
            "exception",
            str(e),
            None
        ) 