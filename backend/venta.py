import sqlite3

DB_RUTA = "C:\\Users\\jp11l\\Documents\\datos\\bd_sistema_ventas.db"

class Venta:
    
    def __init__(self, numero, fecha, hora, usuario, items, metodo, estado, total):
        self.numero = numero
        self.fecha = fecha
        self.hora = hora
        self.usuario = usuario
        self.items = items
        self.metodo = metodo 
        self.estado = estado
        self.total = total

    def toDict(self):
        return {
            "numero": self.numero,
            "fecha": self.fecha,
            "hora": self.hora,
            "usuario": self.usuario,
            "items": self.items,
            "metodo": self.metodo,
            "estado": self.estado,
            "total": self.total
        }
    
    @staticmethod
    def crearTabla():
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute(''' 
            CREATE TABLE IF NOT EXISTS ventas (
                id_venta TEXT NOT NULL PRIMARY KEY,
                fecha TEXT NOT NULL,
                hora TEXT NOT NULL,
                usuario TEXT NOT NULL,
                items INTEGER,
                metodo TEXT NOT NULL,
                estado BOOLEAN,
                total INTEGER    
            );
        ''')
        conexion.commit()
        conexion.close()
    
    @staticmethod
    def agregarVenta(self, cursor):
        cursor.execute('''
            INSERT INTO ventas(id_venta, fecha, hora, usuario, items, metodo, estado, total) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?);''', 
            (self.numero, self.fecha, self.hora, self.usuario, self.items, self.metodo ,self.estado, self.total))
    
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
        
    @staticmethod
    def obtenerUltimoId(cursor, venta_numeracion):
        cursor.execute("""
            SELECT 
                CAST(
                    SUBSTR(id_venta, LENGTH(?) + 2) AS INTEGER
                ) AS consecutivo
            FROM ventas
            WHERE id_venta LIKE ?
            ORDER BY consecutivo DESC
            LIMIT 1;
        """, (
            f"VTA-{venta_numeracion}",
            f"VTA-{venta_numeracion}-%"
        ))

        fila = cursor.fetchone()

        if fila is None or fila[0] is None:
            return 0

        return fila[0] + 1
            