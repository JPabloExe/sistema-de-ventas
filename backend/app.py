from flask import Flask, render_template, request, jsonify
from producto import Producto
from venta import Venta
from usuario import Usuario
from detallesVentas import Detalles
from datetime import datetime

app = Flask(__name__)   

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/inventario')
def inventario():
    return render_template('inventario.html')

@app.route('/puntoVentas')
def puntoVentas():
    return render_template('puntoVentas.html')

@app.route('/ventas')
def ventas():
    return render_template('ventas.html')

@app.route('/agregar', methods=['POST'])
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
    Producto.agregarProducto(nuevo_producto)
    return jsonify({"mensaje": "s"})

@app.route('/obtenerProductos', methods=['GET'])
def obtener_productos():
    categoria = request.args.get('categoria')
    
    productos = Producto.obtenerPorCategoria(categoria)
    
    if len(productos) == 0:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "productos": productos})
    
@app.route('/buscarProducto', methods=['POST'])
def buscar_producto():
    codigo = request.args.get('codigo')
    
    producto = Producto.buscarProducto(int(codigo))
    
    if producto == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "producto": Producto.toDict(producto)})
    
@app.route('/actualizar', methods=['POST'])
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
    Producto.editarProducto(producto_actualizado)
    return jsonify({"mensaje": "s"})

@app.route('/eliminar', methods=['POST'])
def eliminar_producto():
    codigo = request.args.get('codigo')
    
    Producto.eliminarProducto(int(codigo))
    return jsonify({"mensaje": "s"})

@app.route('/realizarVenta', methods=['POST'])
def realizar_venta():
    import sqlite3
    
    DB_RUTA = "backend/datos/bd_sistema_ventas.db"
    
    conexion = sqlite3.connect(DB_RUTA)
    conexion.execute("PRAGMA foreign_keys = ON;")
    cursor = conexion.cursor()
    
    try:
        conexion.execute("BEGIN")
        
        productosComprados = request.json
        
        total = 0
        
        ahora = datetime.now()
        
        venta_numeracion = f"{ahora.year}{ahora.month}{ahora.day}"
        
        consecutivo = Venta.obtenerUltimoId(cursor, venta_numeracion)
        
        id_venta = f"VTA-{venta_numeracion}-{consecutivo}"
        
        usuario = Usuario(1, 'Juan', 'Lopez', 'admin', '1234', 'jp@gmail.com')
        fecha = ahora.strftime("%d/%m/%Y")
        hora = f"{ahora.hour}:{ahora.minute}"
        
        nuevaVenta = Venta(id_venta, fecha, hora, Usuario.toString(usuario), len(productosComprados), 'Efectivo', 'Completada', 0) # Total temporal
        
        Venta.agregarVenta(nuevaVenta, cursor)
        
        for producto in productosComprados:
            Detalles.agregarDetalles(Detalles(id_venta, producto['codigo'], producto['cantidad'], producto['subtotal']), cursor)
            total += producto['subtotal']
        
        Venta.actualizarTotal(id_venta, total, cursor)
        Producto.actualizarStock(productosComprados, cursor)
        
        conexion.commit()
       
        return jsonify({'mensaje': 's'})
    
    except Exception as e:
        conexion.rollback()
        return jsonify({'mensaje': 'n', 'excepcion': str(e)})
    
    finally:
        conexion.close()
        
@app.route('/obtenerVentas', methods=['GET'])
def obtener_ventas():
    try:
        ventas = Venta.obtenerVentas()
        
        if len(ventas) == 0:
            return jsonify({'mensaje': 'n', 'error': 0})
        else:
            return jsonify({'mensaje': 's', 'ventas': ventas})
    
    except Exception as e:
        return jsonify({'mensaje': 'n', 'error': str(e)})

@app.route('/buscarVentas', methods=['POST'])
def buscar_ventas():
    intervalo = request.json
    
    try:
        ventas = Venta.buscarVentas(intervalo['inicial'], intervalo['final'])
        
        if len(ventas) == 0:
            return jsonify({'mensaje': 'n', 'error': 0})
        else:
            return jsonify({'mensaje': 's', 'ventas': ventas})
        
    except Exception as e:
        return jsonify({'mensaje': 'n', 'error': str(e)})
    
@app.route('/eliminarVenta', methods=['POST'])
def eliminar_venta():
    numero = request.args.get('numero')
    
    try:
        Venta.eliminarVenta(numero)
        return jsonify({'mensaje': 's'})
        
    except Exception as e:
        return jsonify({'mensaje': 'n', 'error': str(e)})
    

Detalles.eliminarTabla()

if __name__ == '__main__':
    app.run(debug=True)