from config.db_config import ConexionDB

class VentaRepository:

    @staticmethod
    def realizarVenta(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_venta", [
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
    def obtenerVentas(fecha_inicial, fecha_final):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        try:
            cursor.callproc("sp_obtener_ventas", [fecha_inicial, fecha_final])

            ventas = None

            for resultado in cursor.stored_results():
                ventas = resultado.fetchall()

            if ventas == None:
                return 0
            
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