from config.db_config import ConexionDB

class UsuarioRepository:

    @staticmethod
    def registrarUsuario(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_registrar_usuarios", [
            datos['nombre'],
            datos['apellido'],
            datos['cedula'],
            datos['telefono'],
            datos['usuario'],
            datos['contrasena'],
            datos['cargo']
        ])

        cursor.close()
        conexion.commit()
        conexion.close()
    
    @staticmethod
    def obtenerUsuarios():
        conexion = ConexionDB.get_conexion()
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
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_eliminar_usuario", [cedula])

        cursor.close()
        conexion.commit()
        conexion.close()

    @staticmethod    
    def buscarUsuario(cedula):
        conexion = ConexionDB.get_conexion()
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
    def buscarUsuarioPorID(id):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        cursor.callproc("sp_buscar_usuario_ID", [id])
       
        usuario = None

        for filas in cursor.stored_results():
            usuario = filas.fetchone()
        
        cursor.close()
        conexion.close()
        
        if usuario == None:
            return usuario
        
        return {
            'id': usuario[0],
            'nombre': usuario[1],
            'apellido': usuario[2],
            'cedula': usuario[3],
            'telefono': usuario[4],
            'usuario': usuario[5],
            'contrasena': usuario[6],
            'cargo': usuario[7]
        }
        
    @staticmethod
    def actualizarUsuario(datosActualizados):
        conexion = ConexionDB.get_conexion()
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


        
