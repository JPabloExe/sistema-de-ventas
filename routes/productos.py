from utils.responses import api_response, obtener_mensaje_mysql
from utils.decorators import roles_required
from flask import Blueprint, request
from flask_login import login_required
from repositories.producto_repository import ProductoRepository

productos_bp = Blueprint('productos_bp', __name__)

@productos_bp.route('/agregarProducto', methods=['POST'])
@login_required
@roles_required("Administrador", "Supervisor")
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )
        
@productos_bp.route('/crearCategoria', methods=['POST'])
@login_required
@roles_required("Administrador", "Supervisor")
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@productos_bp.route('/obtenerProductos', methods=['GET'])
@login_required
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
            "error",
            obtener_mensaje_mysql(e),
            None
        ) 
    
@productos_bp.route('/buscarProducto', methods=['POST'])
@login_required
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@productos_bp.route('/actualizarProducto', methods=['PUT'])
@login_required
@roles_required("Administrador", "Supervisor")
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@productos_bp.route('/eliminarProducto', methods=['DELETE'])
@login_required
@roles_required("Administrador", "Supervisor")
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )
    
@productos_bp.route('/obtenerInformeInventario', methods=['GET'])
@login_required
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
            "error",
            obtener_mensaje_mysql(e),
            None
        )

@productos_bp.route('/obtenerCategorias', methods=['GET'])
@login_required
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
            "error",
            obtener_mensaje_mysql(e),
            None
        ) 

@productos_bp.route('/obtenerProductosStockBajo', methods=['GET'])
@login_required
def obtener_productos_stock_bajo():
    try:

        productos = ProductoRepository.obtenerProductosStockBajo()

        if productos == None:
            return api_response(
                False,
                "error",
                "No hay productos con stock bajo",
                None
            )
        else:
            return api_response(
                True,
                "success",
                "Productos con stock bajo cargados",
                productos
            )
        
    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        ) 

@productos_bp.route('/obtenerProductosAVencer', methods=['GET'])
@login_required
def obtener_productos_a_vencer():
    try:

        productos = ProductoRepository.obtenerProductosAVencer()

        if productos == None:
            return api_response(
                False,
                "error",
                "No hay productos proximos a vencer",
                None
            )
        else:
            return api_response(
                True,
                "success",
                "Productos proximos a vencer cargados",
                productos
            )
        
    except Exception as e:
        return api_response(
            False,
            "error",
            obtener_mensaje_mysql(e),
            None
        ) 
