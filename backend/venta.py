import sqlite3
from conexionBD import Conexion

DB_RUTA = "C:\\Users\\jp11l\\Documents\\datos\\bd_sistema_ventas.db"

class Venta:
    
    def __init__(self, id_venta, fecha, hora, codigo_u, metodo, items, total):
        self.id_venta = id_venta
        self.fecha = fecha
        self.hora = hora
        self.codigo_u = codigo_u
        self.metodo = metodo 
        self.items = items
        self.total = total

    def __init__(self, metodo, items):
        self.metodo = metodo 
        self.items = items

    def toDict(self):
        return {
            "id": self.id_venta,
            "fecha": self.fecha,
            "hora": self.hora,
            "usuario": self.usuario,
            "metodo": self.metodo,
            "items": self.items,
            "total": self.total
        }
    
    @staticmethod
    def realizarVenta(self):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_venta", [
                self.metodo,
                self.items, 
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
    def obtenerVentas():
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_obtener_ventas", [])

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
                    "fecha": venta[1],
                    "hora": venta[2],
                    "usuario": venta[3],
                    "items": venta[4],
                    "metodo": venta[5],
                    "total": venta[6]
                })
            
            return ventas_t
        
        except Exception as e:
            print("Error: ", e)
    
    @staticmethod
    def actualizarTotal(id_venta, total, cursor):
        cursor.execute('''
                UPDATE ventas
                SET total = ?
                WHERE id_venta = ?;
            ''', (total, id_venta))
        
    
            