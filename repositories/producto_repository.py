from config.db_config import ConexionDB

class ProductoRepository:

    @staticmethod    
    def agregarProducto(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_agregar_producto", [  
            datos['codigo'], 
            datos['nombre'], 
            datos['stock'], 
            datos['valor_unitario'], 
            datos['costo'],
            datos['fecha_caducidad'],
            datos['categoria']
        ])

        conexion.commit()
        cursor.close()
        conexion.close()

    @staticmethod    
    def obtenerInforme():
        conexion = ConexionDB.get_conexion()
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
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc('sp_eliminar_producto', [codigo])
        
        conexion.commit()
        conexion.close()
        cursor.close()
    
    @staticmethod    
    def buscarProducto(codigo):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_buscar_producto", [codigo])
       
        resultado_final = None

        for resultado in cursor.stored_results():
            resultado_final = resultado.fetchone()
        
        cursor.close()
        conexion.close()
        
        if resultado_final == None:
            return None
        
        return {
            resultado_final[0], 
            resultado_final[1], 
            resultado_final[2], 
            resultado_final[4], 
            resultado_final[5], 
            resultado_final[6].strftime("%Y-%m-%d"), 
            resultado_final[7]
        }
    
    @staticmethod
    def editarProducto(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_actualizar_producto", [
            datos['codigo'], 
            datos['nombre'], 
            datos['stock'], 
            datos['valor_unitario'], 
            datos['costo'],
            datos['fecha_caducidad'],
            datos['categoria']
        ])
        conexion.commit()
        cursor.close()
        conexion.close()
        
    @staticmethod
    def obtenerPorCategoria(categoria):
        conexion = ConexionDB.get_conexion()
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
                "valor_unitario": fila[3],
                "costo": fila[4],
                "fecha_caducidad": fila[5].strftime("%Y-%m-%d"),
                "categoria": fila[6]
            })
        return productos   
        
        
        
