from config.db_config import ConexionDB

class ComprasRepository:

    @staticmethod
    def realizarCompra(datos):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_realizar_compra", [
                datos["proveedor"],
                datos["usuario"], 
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

    @staticmethod
    def obtenerCompras():     
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_obtener_compras")

            filas = []

            for resultado in cursor.stored_results():
                filas.extend(resultado.fetchall())

            compras = []

            for compra in filas:
                compras.append({
                    "id": compra[0],
                    "proveedor": compra[1],
                    "usuario": compra[2],
                    "fecha": compra[3].strftime("%Y-%m-%d"),
                    "hora": str(compra[4]),
                    "factura": compra[5],
                    "metodo_pago": compra[6],
                    "total": compra[7],
                    "estado": compra[8],
                    "id_busqueda": compra[5]
                })

            return compras
            
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def obtenerDetalles(id_compra):
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()

        try:
            cursor.callproc("sp_obtener_detalles_compra", [id_compra])

            filas = []

            for resultado in cursor.stored_results():
                filas.extend(resultado.fetchall())

            detalles = []

            for detalle in filas:
                detalles.append({
                    "nombre": detalle[0],    
                    "cantidad": detalle[1],    
                    "valorU": detalle[2],    
                    "subtotal": detalle[3],   
                })

            return detalles

        except Exception as e:
            raise e
        finally:
            cursor.close()
            conexion.close()

    @staticmethod
    def obtenerMetodosPago():
        conexion = ConexionDB.get_conexion()
        cursor = conexion.cursor()
        
        cursor.callproc("sp_obtener_metodos_pago")
        
        filas = []

        for resultado in cursor.stored_results():
            filas.extend(resultado.fetchall())
            
        cursor.close()
        conexion.close()
        
        metodos = []
        
        for fila in filas:
            metodos.append({
                "id": fila[0],
                "nombre": fila[1]
            })
            
        return metodos
