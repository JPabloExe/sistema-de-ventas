from config.db_config import ConexionDB

class VentaRepository:

    @staticmethod
    def realizarVenta(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_venta", [
                datos["id_usuario"],
                datos["metodo"],
                datos["items"] 
            ])
            
            conexion.commit()
    
        except Exception as e:
            conexion.rollback()
            raise e

        finally:
            cursor.close()
            conexion.close()
        
    @staticmethod
    def eliminarVenta(numero):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc('sp_eliminar_venta', [numero])
        
        conexion.commit()
        conexion.close()
        cursor.close()

    @staticmethod
    def obtenerVentas():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        try:
            cursor.callproc("sp_obtener_ventas")

            ventas = []

            for resultado in cursor.stored_results():
                ventas = resultado.fetchall()

            if len(ventas) == 0:
                return None
            
            conexion.commit()
            cursor.close()
            conexion.close()
            
            ventas_t = []

            for venta in ventas:
                ventas_t.append({
                    "id": venta[0],
                    "usuario": venta[1],
                    "fecha": venta[2].strftime("%Y-%m-%d"),
                    "hora": str(venta[3]),
                    "items": venta[4],
                    "metodo": venta[5],
                    "total": venta[6]
                })
            
            return ventas_t
        
        except Exception as e:
            print("Error: ", e)
    
    @staticmethod
    def buscarVentas(fecha_inicial, fecha_final):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_buscar_ventas", [fecha_inicial, fecha_final])

        ventas = []

        for resultado in cursor.stored_results():
            ventas = resultado.fetchall()

        if len(ventas) == 0:
            return None
        
        conexion.commit()
        cursor.close()
        conexion.close()
        
        ventas_t = []

        for venta in ventas:
            ventas_t.append({
                "id": venta[0],
                "usuario": venta[1],
                "fecha": venta[2].strftime("%Y-%m-%d"),
                "hora": str(venta[3]),
                "items": venta[4],
                "metodo": venta[5],
                "total": venta[6]
            })
        
        return ventas_t
    
    def buscarDetalles(id_venta):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_buscar_detalles_venta", [id_venta])
        
        items = []
        
        for resultado in cursor.stored_results():
            items = resultado.fetchall()
            
        if len(items) == 0:
            return None
        
        items_t = []
        
        for item in items:
            items_t.append({
                "nombre": item[0],    
                "cantidad": item[1],    
                "valorU": item[2],    
                "subtotal": item[3],    
            })
            
        return items_t

    @staticmethod
    def obtenerInforme():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        datos = cursor.callproc("sp_informe_ventas_hoy", [0, 0])

        cursor.close()
        conexion.close()
        
        informe = {
            "ventas": datos[0],
            "valor_ventas": datos[1]
        }
        
        return informe