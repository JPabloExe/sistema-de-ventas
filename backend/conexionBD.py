import mysql.connector

class Conexion:
    @staticmethod
    def get_conexion():
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="pablo2004",
            database="bd_sistema_ventas"
        )