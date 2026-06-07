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

        for fila in filas:
            usuarios.append({
                'nombre': fila[0],
                'apellido': fila[1],
                'cedula': fila[2],
                'telefono': fila[3],
                'usuario': fila[4],
                'contrasena': fila[5],
                'cargo': fila[6]
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


        
