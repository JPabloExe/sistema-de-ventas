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
 