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