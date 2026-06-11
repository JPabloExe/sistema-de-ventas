from database.conexionBD import Conexion
from entities.usuario import Usuario

class UsuarioRepository:

    @staticmethod
    def registrarUsuario(usuario):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_registrar_usuarios", [
            usuario.nombre,
            usuario.apellido,
            usuario.cedula,
            usuario.telefono,
            usuario.usuario,
            usuario.contrasena,
            usuario.id_cargo
        ])

        cursor.close()
        conexion.commit()
        conexion.close()
    
    @staticmethod
    def obtenerUsuarios():
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc('sp_obtener_usuarios', [])

        filas = []

        for resultado in cursor.stored_results():
            filas.extend(resultado.fetchall())

        cursor.close()
        conexion.close()

        usuarios = []

        for usuario in filas:
            usuarios.append({
                'nombre': usuario[0],
                'apellido': usuario[1],
                'cedula': usuario[2],
                'telefono': usuario[3],
                'usuario': usuario[4],
                'contrasena': usuario[5],
                'cargo': usuario[6]
            })
            
        return usuarios
    
    @staticmethod
    def eliminarUsuario(cedula):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_eliminar_usuario", [cedula])

        cursor.close()
        conexion.commit()
        conexion.close()

    @staticmethod    
    def buscarUsuario(cedula):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_buscar_usuario", [cedula])
       
        usuario = None

        for filas in cursor.stored_results():
            usuario = filas.fetchone()
        
        cursor.close()
        conexion.close()
        
        if usuario == None:
            return usuario
        
        return {
            'nombre': usuario[0],
            'apellido': usuario[1],
            'cedula': usuario[2],
            'telefono': usuario[3],
            'usuario': usuario[4],
            'contrasena': usuario[5],
            'cargo': usuario[6]
        }
        
    @staticmethod
    def actualizarUsuario(datosActualizados):
        conexion = Conexion.get_conexion()
        cursor = conexion.cursor()
        cursor.callproc("sp_actualizar_usuario", [
            datosActualizados['nombre'], 
            datosActualizados['apellido'], 
            datosActualizados['cedula'], 
            datosActualizados['telefono'], 
            datosActualizados['usuario'], 
            datosActualizados['contrasena'], 
            datosActualizados['cargo']
        ])
        conexion.commit()
        cursor.close()
        conexion.close()


        
