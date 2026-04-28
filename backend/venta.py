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
        cursor.callproc("sp_realizar_venta", [
            self.metodo,
            self.items, 
        ])

        for result in cursor.stored_results():
            result.fetchall()
        
        cursor.close()
        conexion.close()
        conexion.commit()
        
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
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('SELECT * FROM ventas')
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
    def actualizarTotal(id_venta, total, cursor):
        cursor.execute('''
                UPDATE ventas
                SET total = ?
                WHERE id_venta = ?;
            ''', (total, id_venta))
        
    
            