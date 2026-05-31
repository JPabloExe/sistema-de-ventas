class Usuario:
    
    def __init__(self, nombre, apellido, cedula, telefono, usuario, contrasena, id_cargo):
        self.nombre = nombre
        self.apellido = apellido
        self.cedula = cedula
        self.telefono = telefono
        self.usuario = usuario
        self.contrasena = contrasena
        self.id_cargo = id_cargo

    def toDict(self):
        return {
            "nombre": self.nombre,
            "apellido": self.apellido,
            "cedula": self.cedula,
            "telefono": self.telefono,
            "usuario": self.usuario,
            "contrasena": self.contrasena,
            "id_cargo": self.id_cargo
        }