from config.db_config import ConexionDB


class ProveedoresRepository:

    @staticmethod
    def registrarProveedor(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_registrar_proveedor", [
                datos['nombre'],
                datos['nit'],
                datos['telefono'],
                datos['correo'],
                datos['direccion'],
                datos['ciudad'],
                datos['estado']
            ])

            conexion.commit()

        except Exception as e:
            conexion.rollback()
            raise e

        finally:
            cursor.close()
            conexion.close()
    
    @staticmethod
    def actualizarProveedor(datosActualizados):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_actualizar_proveedor", [
                datosActualizados['id'],
                datosActualizados['nombre'],
                datosActualizados['nit'],
                datosActualizados['telefono'],
                datosActualizados['correo'],
                datosActualizados['direccion'],
                datosActualizados['ciudad'],
                datosActualizados['estado']
            ])

            conexion.commit()

        except Exception as e:
            conexion.rollback()
            raise e

        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def eliminarProveedor(proveedor_id):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_eliminar_proveedor", [
                proveedor_id
            ])

            conexion.commit()

        except Exception as e:
            conexion.rollback()
            raise e

        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def buscarProveedor(nit_proveedor):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_buscar_proveedor", [
                nit_proveedor
            ])

            fila = []

            for resultado in cursor.stored_results():
                fila = resultado.fetchone()

            proveedores = []

            proveedores.append({
                "id": fila[0],
                "nombre": fila[1],
                "nit": fila[2],
                "telefono": fila[3],
                "correo": fila[4],
                "direccion": fila[5],
                "ciudad": fila[6],
                "estado": fila[7],
                "id_busqueda": fila[2]
            })

            return proveedores

        except Exception as e:
            raise e

        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def obtenerProveedores():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_obtener_proveedores")

            filas = []

            for resultado in cursor.stored_results():
                filas.extend(resultado.fetchall())

            proveedores = []

            for proveedor in filas:
                proveedores.append({
                    "id": proveedor[0],
                    "nombre": proveedor[1],
                    "nit": proveedor[2],
                    "telefono": proveedor[3],
                    "correo": proveedor[4],
                    "direccion": proveedor[5],
                    "ciudad": proveedor[6],
                    "estado": proveedor[7],
                    "id_busqueda": proveedor[2]
                })

            return proveedores

        except Exception as e:
            raise e

        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def obtenerEstadosProveedores():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_obtener_estados_proveedores")

            filas = []

            for resultado in cursor.stored_results():
                filas.extend(resultado.fetchall())

            estados = []

            for estado in filas:
                estados.append({
                    "id": estado[0],
                    "nombre": estado[1]
                })

            return estados

        except Exception as e:
            raise e

        finally:
            cursor.close()
            conexion.close()