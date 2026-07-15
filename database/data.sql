USE bd_sistema_ventas;

INSERT INTO roles(nombre, descripcion) 
VALUES(
    'Administrador', 
    'Gestiona: usuarios, productos, categorías, ventas y ve reportes'
);

INSERT INTO roles(nombre, descripcion) 
VALUES(
    'Empleado', 'Registra ventas, consulta productos y ventas'
);

INSERT INTO roles(nombre, descripcion) 
VALUES(
    'Supervisor', 
    'Registra ventas, consulta productos, ventas y ve reportes'
);

INSERT INTO categorias(nombre) 
VALUES("Abarrotes");

INSERT INTO categorias(nombre) 
VALUES("Bebidas");

INSERT INTO categorias(nombre) 
VALUES("Limpieza");

INSERT INTO usuarios(
    nombre, 
    apellido, 
    cedula, 
    telefono, 
    usuario, 
    contrasena, 
    id_rol
    )
    VALUES(
        "####",
        "####",
        "####",
        "####",
        "####",
        "####",
        1
    );