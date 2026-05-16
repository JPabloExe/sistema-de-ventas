from flask import Blueprint, request, jsonify
from entities.producto import Producto
from repositories.producto_repository import ProductoRepository

productos_bp = Blueprint('productos_bp', __name__)

@productos_bp.route('/agregarProducto', methods=['POST'])
def agregar_producto():
    datos = request.json
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
    return jsonify({"mensaje": "s"})

@productos_bp.route('/obtenerProductos', methods=['GET'])
def obtener_productos():
    categoria = request.args.get('categoria')
    
    productos = ProductoRepository.obtenerPorCategoria(categoria)
    
    if len(productos) == 0:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "productos": productos})
    
@productos_bp.route('/buscarProducto', methods=['POST'])
def buscar_producto():
    codigo = request.args.get('codigo')

    try:
        producto = ProductoRepository.buscarProducto(codigo)
        
        if producto == None:
            return jsonify({"mensaje": "n"})
        else:
            return jsonify({"mensaje": "s", "producto": Producto.toDict(producto)})
    except Exception as e:
        return jsonify({'mensaje': 'n', 'excepcion': str(e)})
    

@productos_bp.route('/actualizarProducto', methods=['POST'])
def actualizar_producto():
    datos = request.json
    
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
    return jsonify({"mensaje": "s"})

@productos_bp.route('/eliminarProducto', methods=['POST'])
def eliminar_producto():
    codigo = request.args.get('codigo')
    try:
        ProductoRepository.eliminarProducto(int(codigo))
        return jsonify({"mensaje": "s"})
    except Exception as e:
        return jsonify({'mensaje': 'n', 'excepcion': str(e)})
    
@productos_bp.route('/obtenerInformeInventario', methods=['GET'])
def informe_inventario():
    
    informe = ProductoRepository.obtenerInforme()
    
    if informe == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "informe": informe})
   