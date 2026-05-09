from flask import Flask, render_template, request, jsonify
from producto import Producto
from venta import Venta
from dotenv import load_dotenv
import json

load_dotenv()

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
    
    producto = Producto.buscarProducto(codigo)
    
    if producto == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "producto": Producto.toDict(producto)})

@app.route('/obtenerInformeInventario', methods=['GET'])
def informe_inventario():
    
    informe = Producto.obtenerInforme()
    
    if informe == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "informe": informe})
    
@app.route('/obtenerInformeVentas', methods=['GET'])
def informe_ventas():
    
    informe = Venta.obtenerInforme()
    
    if informe == None:
        return jsonify({"mensaje": "n"})
    else:
        return jsonify({"mensaje": "s", "informe": informe})
    
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

    try:   
        productosComprados = request.get_json()

        productos_json = json.dumps(productosComprados)
        
        nuevaVenta = Venta('Efectivo', productos_json) 
        
        Venta.realizarVenta(nuevaVenta)
        
        return jsonify({'mensaje': 's'})
    
    except Exception as e:
        return jsonify({'mensaje': 'n', 'excepcion': str(e)})
    
        
@app.route('/obtenerVentas', methods=['POST'])
def obtener_ventas():

    intervalo = request.get_json()

    try:
        ventas = Venta.obtenerVentas(intervalo['inicial'], intervalo['final'])
        
        if ventas == 0:
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

if __name__ == '__main__':
    app.run(debug=True)