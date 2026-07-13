from flask_login import UserMixin

class Usuario(UserMixin):
    def __init__(self, datos):
        self.id = datos["id"]
        self.nombre = datos["nombre"]
        self.apellido = datos["apellido"]
        self.cedula = datos["cedula"]
        self.telefono = datos["telefono"]
        self.usuario = datos["usuario"]
        self.contrasena = datos["contrasena"]
        self.cargo = datos["cargo"]