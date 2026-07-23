CREATE DATABASE IF NOT EXISTS bd_sistema_ventas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bd_sistema_ventas; 

DROP TABLE IF EXISTS detalles_compras;
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS detalles_ventas;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    codigo VARCHAR(4) PRIMARY KEY,
    nombre_p VARCHAR(50),
    stock INT,
    stock_m INT DEFAULT 5,
    valor_u INT,
    costo INT,
    fecha_c DATE,
    id_categoria INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    cedula VARCHAR(12),
    telefono VARCHAR(50),
    usuario VARCHAR(50),
    contrasena VARCHAR(50),
    id_rol INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_rol)
        REFERENCES roles(id)
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha DATE,
    hora TIME,
    items INT,
    metodo VARCHAR(50),
    total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
);

CREATE TABLE detalles_ventas (
    id_venta INT,
    codigo_p VARCHAR(4),
    cantidad_c INT,
    subtotal INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta)
        ON DELETE CASCADE,

    FOREIGN KEY (codigo_p)
        REFERENCES productos(codigo)
);