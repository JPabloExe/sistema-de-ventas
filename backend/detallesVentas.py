import sqlite3

DB_RUTA = "backend/datos/bd_sistema_ventas.db"

class Detalles:
    
    def __init__(self, id_venta, codigo_producto, cantidad_comprada, subtotal):
        self.id_venta = id_venta
        self.codigo_producto = codigo_producto
        self.cantidad_comprada = cantidad_comprada
        self.subtotal = subtotal
        
    @staticmethod
    def crearTabla():
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS detalles_ventas(
                id_venta TEXT NOT NULL ,
                codigo_producto INTEGER,
                cantidad_comprada INTEGER,
                subtotal INTEGER,
                
                FOREIGN KEY (id_venta)
                    REFERENCES ventas(id_venta)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                    
                FOREIGN KEY (codigo_producto)
                    REFERENCES productos(codigo_producto)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );
        ''')
        conexion.commit()
        conexion.close()
        
    @staticmethod
    def agregarDetalles(self, cursor): 
        cursor.execute('''
            INSERT INTO detalles_ventas(id_venta, codigo_producto, cantidad_comprada, subtotal) 
            VALUES(?, ?, ?, ?);''', 
            (self.id_venta, self.codigo_producto, self.cantidad_comprada, self.subtotal))
        
    @staticmethod
    def eliminarDetalles(id_venta):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('''
            DELETE FROM detalles_ventas WHERE id_venta = ?''', (id_venta,))
        conexion.commit()
        conexion.close()
        