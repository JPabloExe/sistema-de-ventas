from database.conexionBD import Conexion
from entities.venta import Venta

class VentaRepository:

    @staticmethod
    def realizarVenta(venta):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_venta", [
                venta.metodo,
                venta.items, 
            ])
            
            conexion.commit()

        except Exception as e:
            print("Error: ", e)
            conexion.rollback()

        finally:
            cursor.close()
            conexion.close()
        
    @staticmethod
    def eliminarVenta(numero):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('DELETE FROM ventas WHERE id_venta = ?;', (numero,))
        conexion.commit()
        conexion.close()
        
    @staticmethod
    def buscarVentas(fechaInicial, fechaFinal):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('SELECT * FROM ventas WHERE fecha BETWEEN ? AND ?;', (fechaInicial, fechaFinal))
        datos = cursor.fetchall()
        conexion.close()
        
        ventas = []
        
        for venta in datos:
            ventas.append({
                "numero": venta[0],
                "fecha": venta[1],
                "hora": venta[2],
                "usuario": venta[3],
                "items": venta[4],
                "metodo": venta[5],
                "estado": venta[6],
                "total": venta[7]
            })
        return ventas

    @staticmethod
    def obtenerVentas(fecha_inicial, fecha_final):
        conexion = Conexion.get_conexion()
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
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        datos = cursor.callproc("sp_informe_ventas_hoy", [0, 0])

        cursor.close()
        conexion.close()
        
        informe = {
            "ventas": datos[0],
            "valor_ventas": datos[1]
        }
        
        return informe

    @staticmethod
    def actualizarTotal(id_venta, total, cursor):
        cursor.execute('''
                UPDATE ventas
                SET total = ?
                WHERE id_venta = ?;
            ''', (total, id_venta))