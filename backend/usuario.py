import sqlite3

DB_RUTA = "C:\\Users\\jp11l\\Documents\\datos\\bd_sistema_ventas.db"

class Usuario:
    
    def __init__(self, cedula, nombre, apellido, usuario, contrasena, correo):
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido
        self.usuario = usuario
        self.contrasena = contrasena 
        self.correo = correo

    def toDict(self):
        return {
            "cedula": self.cedula,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "usuario": self.usuario,
            "contrasena": self.contrasena,
            "correo": self.correo
        }
    
    @staticmethod
    def toString(self):
        return self.usuario