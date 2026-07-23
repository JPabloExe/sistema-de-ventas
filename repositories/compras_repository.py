from config.db_config import ConexionDB

class ComprasRepository:

    @staticmethod
    def realizar_compra(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_compra", [
                datos["proveedor"],
                datos["usuario"],
                datos["factura"], 
                datos["metodo"], 
                datos["productos"] 
            ])

            conexion.commit()

        except Exception as e:
            conexion.rollback()
            raise e

        finally:
            cursor.close()
            conexion.close()
            
