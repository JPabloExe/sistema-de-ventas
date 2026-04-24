import sqlite3
from conexionBD import Conexion

DB_RUTA = "C:\\Users\\jp11l\\Documents\\datos\\bd_sistema_ventas.db"


class Producto:
    def __init__(self, codigo, nombre, stock, valor_unitario, costo, fecha_caducidad, categoria):
        self.codigo = codigo
        self.nombre = nombre
        self.stock = stock
        self.stock_m = 5
        self.valor_unitario =  valor_unitario
        self.costo =  costo
        self.fecha_caducidad = fecha_caducidad
        self.categoria = categoria
        
    def toDict(self):
        return {
            "codigo": self.codigo,
            "nombre": self.nombre,
            "stock": self.stock,
            "stock_m": self.stock_m,
            "valor_unitario": self.valor_unitario,
            "costo": self.costo,
            "fecha_caducidad": self.fecha_caducidad,
            "categoria": self.categoria,
        }
    
    @staticmethod    
    def agregarProducto(self):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_agregar_producto", [
            self.codigo, 
            self.nombre, 
            self.stock, 
            self.stock_m, 
            self.valor_unitario, 
            self.costo, 
            self.fecha_caducidad, 
            self.categoria
        ])

        conexion.commit()
        cursor.close()
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
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_buscar_producto", [codigo])
       
        resultado_final = None

        for resultado in cursor.stored_results():
            resultado_final = resultado.fetchone()
        
        cursor.close()
        conexion.close()
        
        if resultado_final == None:
            return None
        
        return Producto(
            resultado_final[0], 
            resultado_final[1], 
            resultado_final[2], 
            resultado_final[4], 
            resultado_final[5], 
            resultado_final[6], 
            resultado_final[7]
        )
    
    @staticmethod
    def editarProducto(self):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_actualizar_producto", [
            self.codigo, 
            self.nombre, 
            self.stock, 
            self.valor_unitario, 
            self.costo, 
            self.fecha_caducidad, 
            self.categoria
        ])
        conexion.commit()
        cursor.close()
        conexion.close()
        
    @staticmethod
    def obtenerPorCategoria(categoria):
        conexion = Conexion.get_conexion()
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
                "valor_unitario": fila[4],
                "costo": fila[5],
                "fecha_caducidad": fila[6],
                "categoria": fila[7]
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
        
        
        
        