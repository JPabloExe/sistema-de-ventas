from config.db_config import ConexionDB

class LoginRepository():
    
    @staticmethod
    def iniciarSesion(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_iniciar_sesion", [
            datos["usuario"],
            datos["contrasena"]
        ])
            
        usuario = None
        
        for fila in cursor.stored_results():
            usuario = fila.fetchone()
            
        if usuario == None:
            return usuario
        
        cursor.close()
        conexion.close()
        
        return {
            "id": usuario[0],
            "nombre": usuario[1],
            "apellido": usuario[2],
            "cedula": usuario[3],
            "telefono": usuario[4],
            "usuario": usuario[5],
            "contrasena": usuario[6],
            "cargo": usuario[7],
        }