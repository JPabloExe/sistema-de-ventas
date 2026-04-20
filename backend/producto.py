import sqlite3

DB_RUTA = "C:\\Users\\jp11l\\Documents\\datos\\bd_sistema_ventas.db"

class Producto:
    def __init__(self, codigo, nombre, stock, valor_unitario, costo, fecha_caducidad, categoria):
        self.codigo = codigo
        self.nombre = nombre
        self.stock = stock
        self.valor_unitario =  valor_unitario
        self.costo =  costo
        self.fecha_caducidad = fecha_caducidad
        self.categoria = categoria
        
    def toDict(self):
        return {
            "codigo": self.codigo,
            "nombre": self.nombre,
            "stock": self.stock,
            "valor_unitario": self.valor_unitario,
            "costo": self.costo,
            "fecha_caducidad": self.fecha_caducidad,
            "categoria": self.categoria,
        }
    
    @staticmethod
    def crearTabla():
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('''
                CREATE TABLE IF NOT EXISTS productos(
                    codigo INTEGER PRIMARY KEY,
                    nombre TEXT NOT NULL,
                    stock INTEGER,
                    valor_unitario INTEGER,
                    costo INTEGER,
                    fecha_caducidad TEXT NOT NULL,
                    categoria TEXT NOT NULL
                );         
            ''')
        conexion.commit()
        conexion.close()
    
    @staticmethod    
    def agregarProducto(self):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('''
            INSERT INTO productos(codigo, nombre, stock, valor_unitario, costo, fecha_caducidad, categoria)
            VALUES(?, ?, ?, ?, ?, ?, ?)''', (self.codigo, self.nombre, self.stock, self.valor_unitario, self.costo, self.fecha_caducidad, self.categoria)
            )
        conexion.commit()
        conexion.close()
    
    @staticmethod
    def eliminarProducto(codigo):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('DELETE FROM productos WHERE codigo = ?', (codigo,))
        conexion.commit()
        conexion.close()
    
    @staticmethod    
    def buscarProducto(codigo):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('SELECT * FROM productos WHERE codigo = ?', (codigo,))
        producto = cursor.fetchone() #Almacena una fila
        conexion.close()
        
        if producto:
            return Producto(producto[0], producto[1], producto[2], producto[3], producto[4], producto[5], producto[6])
        else:
            return None
        
    @staticmethod
    def editarProducto(self):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        cursor.execute('''
            UPDATE productos 
            SET nombre = ?, stock = ?, valor_unitario = ?, costo = ?, fecha_caducidad = ?, categoria = ?
            WHERE codigo = ?''', (self.nombre, self.stock, self.valor_unitario, self.costo, self.fecha_caducidad, self.categoria, self.codigo)
            )
        conexion.commit()
        conexion.close()
        
    @staticmethod
    def obtenerPorCategoria(categoria):
        conexion = sqlite3.connect(DB_RUTA)
        conexion.execute("PRAGMA foreign_keys = ON;")
        cursor = conexion.cursor()
        
        if categoria != "" or len(categoria) != 0:
            cursor.execute('SELECT * FROM productos WHERE categoria = ?;', (categoria,))
        else:
            cursor.execute('SELECT * FROM productos;')
            
        filas = cursor.fetchall() #Almacena todas las filas
        conexion.close()
        
        productos = []
        
        for fila in filas:
            productos.append({
                "codigo": fila[0],
                "nombre": fila[1],
                "stock": fila[2],
                "valor_unitario": fila[3],
                "costo": fila[4],
                "fecha_caducidad": fila[5],
                "categoria": fila[6]
            })
        return productos   
    
    @staticmethod
    def actualizarStock(productosComprados, cursor):
        for producto in productosComprados:
            cantidad = producto["cantidad"]
            codigo = producto["codigo"]

            if cantidad <= 0:
                raise ValueError("Cantidad inválida")

            cursor.execute("""
                UPDATE productos
                SET stock = stock - ?
                WHERE codigo = ?
                  AND stock >= ?;
            """, (cantidad, codigo, cantidad))

            if cursor.rowcount == 0:
                raise Exception(f"Stock insuficiente ({codigo})")
        
        
        
        