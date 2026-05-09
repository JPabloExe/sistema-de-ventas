from database.conexionBD import Conexion
from entities.producto import Producto

class ProductoRepository:

    @staticmethod    
    def agregarProducto(producto):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_agregar_producto", [
            producto.codigo, 
            producto.nombre, 
            producto.stock, 
            producto.stock_m, 
            producto.valor_unitario, 
            producto.costo, 
            producto.fecha_caducidad, 
            producto.categoria
        ])

        conexion.commit()
        cursor.close()
        conexion.close()

    @staticmethod    
    def obtenerInforme():
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        datos = cursor.callproc("sp_informe_inventario", [0, 0, 0])
            
        cursor.close()
        conexion.close()
        
        informe = {
            "productos": datos[0],
            "valor_total": datos[1],
            "stock_bajo": datos[2]
        }
    
        return informe 
    
    @staticmethod
    def eliminarProducto(codigo):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc('sp_eliminar_producto', [codigo])
        
        conexion.commit()
        conexion.close()
        cursor.close()
    
    @staticmethod    
    def buscarProducto(codigo):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_buscar_producto", [codigo])
       
        resultado_final = None

        for resultado in cursor.stored_results():
            resultado_final = resultado.fetchone()
        
        cursor.close()
        conexion.close()
        
        if resultado_final == None:
            return None
        
        return Producto(
            resultado_final[0], 
            resultado_final[1], 
            resultado_final[2], 
            resultado_final[4], 
            resultado_final[5], 
            resultado_final[6], 
            resultado_final[7]
        )
    
    @staticmethod
    def editarProducto(producto):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_actualizar_producto", [
            producto.codigo, 
            producto.nombre, 
            producto.stock, 
            producto.valor_unitario, 
            producto.costo, 
            producto.fecha_caducidad, 
            producto.categoria
        ])
        conexion.commit()
        cursor.close()
        conexion.close()
        
    @staticmethod
    def obtenerPorCategoria(categoria):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_obtener_productos_por_categoria", [categoria])
        
        filas = []

        for resultado in cursor.stored_results():
            filas.extend(resultado.fetchall())
            
        cursor.close()
        conexion.close()
        
        productos = []
        
        for fila in filas:
            productos.append({
                "codigo": fila[0],
                "nombre": fila[1],
                "stock": fila[2],
                "valor_unitario": fila[4],
                "costo": fila[5],
                "fecha_caducidad": fila[6],
                "categoria": fila[7]
            })
        return productos   
        
        
        
        
