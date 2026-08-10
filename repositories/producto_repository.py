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
            datos['id_categoria'],
            datos['id_proveedor']
        ])

        conexion.commit()
        cursor.close()
        conexion.close()
        
    @staticmethod
    def crearCategoria(categoria):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_crear_categoria", [
            categoria["nombre"],
            categoria["descripcion"]
        ])
        
        cursor.close()
        conexion.commit()
        conexion.close()

    @staticmethod    
    def obtenerInforme():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        datos = cursor.callproc("sp_informe_inventario", [0, 0, 0, 0])
            
        cursor.close()
        conexion.close()
        
        informe = {
            "productos": datos[0],
            "valor_total": datos[1],
            "stock_bajo": datos[2],
            "productos_vencer": datos[3]
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
            "id": resultado_final[0],
            "codigo": resultado_final[1],
            "nombre": resultado_final[2],
            "stock": resultado_final[3],
            "valor_unitario": resultado_final[4],
            "costo": resultado_final[5],
            "fecha_caducidad": resultado_final[6].strftime("%Y-%m-%d"),
            "id_categoria": resultado_final[7],
            "id_proveedor": resultado_final[8]
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
            datos['id_categoria'],
            datos['id_proveedor']
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
                "id": fila[0],
                "codigo": fila[1],
                "nombre": fila[2],
                "stock": fila[3],
                "valor_unitario": fila[4],
                "costo": fila[5],
                "fecha_caducidad": fila[6].strftime("%Y-%m-%d"),
                "id_categoria": fila[7],
                "id_proveedor": fila[8],
                "id_busqueda": fila[1]
            })
            
        return productos 
    
    @staticmethod
    def obtenerCategorias():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_obtener_categorias")
        
        filas = []

        for resultado in cursor.stored_results():
            filas.extend(resultado.fetchall())
            
        cursor.close()
        conexion.close()
        
        categorias = []
        
        for fila in filas:
            categorias.append({
                "id": fila[0],
                "nombre": fila[1]
            })
            
        return categorias
            
        
        
          
        
        
        
