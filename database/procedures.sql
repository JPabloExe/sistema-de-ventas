USE bd_sistema_ventas;

-- PROCEDURES PRODUCTOS

DROP PROCEDURE IF EXISTS sp_agregar_producto;
DROP PROCEDURE IF EXISTS sp_actualizar_producto;
DROP PROCEDURE IF EXISTS sp_buscar_producto;
DROP PROCEDURE IF EXISTS sp_eliminar_producto;
DROP PROCEDURE IF EXISTS sp_obtener_productos_por_categoria;
DROP PROCEDURE IF EXISTS sp_crear_categoria;

DELIMITER //

CREATE PROCEDURE sp_agregar_producto(
    IN p_codigo VARCHAR(4),
    IN p_nombre_p VARCHAR(50),
    IN p_stock INT,
    IN p_valor_u INT,
    IN p_costo INT,
    IN p_fecha_c DATE,
    IN p_id_categoria INT
)
BEGIN

    DECLARE mensaje VARCHAR(100);

    IF EXISTS(
        SELECT *
        FROM productos AS p
        WHERE p.codigo = p_codigo
    ) THEN 
        SET mensaje = CONCAT('El codigo [', p_codigo, '] ya existe');
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = mensaje;
    END IF;

    IF p_codigo IS NULL OR TRIM(p_codigo) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Campo [codigo] vacio';

    ELSEIF p_nombre_p IS NULL OR TRIM(p_nombre_p) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Campo [nombre] vacio';

    ELSEIF p_stock < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El stock debe ser mayor a 0';

    ELSEIF p_valor_u <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio debe ser mayor a 0';

    ELSEIF p_costo <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El costo debe ser mayor a 0';

    ELSEIF p_fecha_c IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Campo [fecha caducidad] vacio';

    ELSEIF p_fecha_c < CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Fecha de caducidad invalida';
    END IF;
    

    IF NOT EXISTS(
        SELECT * 
        FROM categorias AS c
        WHERE c.id = p_id_categoria
    ) THEN 
        SET mensaje = CONCAT('La categoria [', p_id_categoria, '] no existe');
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = mensaje;
    END IF;

    INSERT INTO productos(
        codigo, 
        nombre_p, 
        stock, 
        valor_u, 
        costo, 
        fecha_c, 
        id_categoria
    )
    VALUES(
        p_codigo, 
        p_nombre_p, 
        p_stock, 
        p_valor_u, 
        p_costo, 
        p_fecha_c, 
        p_id_categoria
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_actualizar_producto(
    IN codigo_p VARCHAR(4), 
    IN nombre VARCHAR(50),
    IN stock_p INT,
    IN valor_u_p INT,
    IN costo_p INT,
    IN fecha_c_p DATETIME,
    IN id_categoria_p INT
)
BEGIN

    UPDATE productos AS p
    SET 
        p.nombre_p = nombre,
        p.stock = stock_p,
        p.valor_u = valor_u_p,
        p.costo = costo_p,
        p.fecha_c = fecha_c_p,
        p.id_categoria = id_categoria_p
    WHERE codigo = codigo_p;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_buscar_producto(
    IN p_codigo VARCHAR(4)
)
BEGIN

    IF NOT EXISTS(
        SELECT * 
        FROM productos AS p
        WHERE p.codigo = p_codigo
    ) THEN 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este producto no existe';
    END IF;

    SELECT 
        p.codigo, 
        p.nombre_p, 
        p.stock, 
        p.valor_u, 
        p.costo, 
        p.fecha_c, 
        c.nombre
    FROM productos AS p
    INNER JOIN categorias AS c
    ON p.id_categoria = c.id
    WHERE p.codigo = p_codigo;

END // 

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_eliminar_producto(
    IN p_codigo VARCHAR(4)
)
BEGIN
    DECLARE p_existe INT DEFAULT 0;
    DECLARE mensaje_error VARCHAR(100);

    SELECT COUNT(*)
    INTO p_existe
    FROM productos
    WHERE codigo = p_codigo;

    IF p_existe = 0 THEN
        SET mensaje_error = CONCAT('El producto con codigo [', p_codigo, '] no existe.');
        SIGNAL SQLSTATE '45000' -- Interrumpe o corta la operacion
        SET MESSAGE_TEXT = mensaje_error;
    END IF;

    DELETE FROM productos 
    WHERE codigo = p_codigo;
END //

DELIMITER ; 

DELIMITER // 

CREATE PROCEDURE sp_obtener_productos_por_categoria(
    IN p_id_categoria INT
)
BEGIN

    DECLARE cant_productos INT DEFAULT 0;
    IF p_id_categoria = 0 THEN
        
        SELECT 
            p.codigo, 
            p.nombre_p, 
            p.stock, 
            p.valor_u, 
            p.costo, 
            p.fecha_c, 
            p.id_categoria
        FROM productos AS p;
    ELSEIF NOT EXISTS(
        SELECT *
        FROM categorias AS c
        WHERE c.id = p_id_categoria
    ) THEN 

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Esta categoria no existe';
    ELSE 

        SELECT COUNT(*) 
        INTO cant_productos
        FROM productos AS p
        WHERE p.id_categoria = p_id_categoria;
        IF cant_productos = 0  THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No hay productos registrados en esta categoria';
        END IF;
        SELECT 
            p.codigo, 
            p.nombre_p, 
            p.stock, 
            p.valor_u, 
            p.costo, 
            p.fecha_c, 
            p.id_categoria
        FROM productos AS p
        INNER JOIN categorias AS c
        ON p.id_categoria = c.id
        WHERE c.id = p_id_categoria;
    END IF;
    
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_crear_categoria(
    IN c_nombre VARCHAR(50),
    IN c_descripcion VARCHAR(100)
)
BEGIN
    
    IF c_nombre IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Debe ingresar un nombre';
    END IF;

    IF EXISTS(
        SELECT * 
        FROM categorias 
        WHERE nombre = c_nombre
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Esta categoria ya existe';
    END IF;

    INSERT INTO categorias(nombre, descripcion) 
    VALUES(c_nombre, c_descripcion);
END //  

DELIMITER ;

DELIMITER //

    CREATE PROCEDURE sp_obtener_categorias()
BEGIN
    SELECT c.id, c.nombre
    FROM categorias AS c;
END // 

DELIMITER ;

-- PROCEDURES USUARIOS

DROP PROCEDURE IF EXISTS sp_registrar_usuarios;
DROP PROCEDURE IF EXISTS sp_actualizar_usuario;
DROP PROCEDURE IF EXISTS sp_buscar_usuario;
DROP PROCEDURE IF EXISTS sp_buscar_usuario_ID;
DROP PROCEDURE IF EXISTS sp_eliminar_usuario;
DROP PROCEDURE IF EXISTS sp_obtener_usuarios;

DELIMITER //

CREATE PROCEDURE sp_registrar_usuarios(
    IN u_nombre VARCHAR(50),
    IN u_apellido VARCHAR(50),
    IN u_cedula VARCHAR(10),
    IN u_telefono VARCHAR(50),
    IN u_usuario VARCHAR(50),
    IN u_contrasena VARCHAR(50),
    IN u_id_rol INT
)
BEGIN

    IF CHAR_LENGTH(u_cedula) > 12 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Longitud de cedula incorrecta';
    END IF;

    IF u_id_rol = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Debes seleccionar un cargo';
    END IF;

    IF EXISTS(
        SELECT *
        FROM usuarios AS u
        WHERE u.cedula = u_cedula
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Esta cedula ya esta registrada';
    END IF;

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
        u_nombre,
        u_apellido,
        u_cedula,
        u_telefono,
        u_usuario,
        u_contrasena,
        u_id_rol
    );

END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_actualizar_usuario(
    IN u_nombre VARCHAR(50),
    IN u_apellido VARCHAR(50),
    IN u_cedula VARCHAR(10),
    IN u_telefono VARCHAR(50),
    IN u_usuario VARCHAR(50),
    IN u_contrasena VARCHAR(50),
    IN u_id_rol INT
)
BEGIN

    IF NOT EXISTS (
        SELECT *
        FROM usuarios AS u
        WHERE u.cedula = u_cedula
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este usuario no existe';
    END IF;

    IF CHAR_LENGTH(u_telefono) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Longitud de telefono incorrecta';
    END IF;

    UPDATE usuarios AS u
    SET
        u.nombre = u_nombre,
        u.apellido = u_apellido,
        u.cedula = u_cedula,
        u.telefono = u_telefono,
        u.usuario = u_usuario,
        u.contrasena = u_contrasena,
        u.id_rol = u_id_rol
    WHERE u.cedula = u_cedula;

END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_buscar_usuario(
    IN u_cedula VARCHAR(12)
)
BEGIN

    IF NOT EXISTS (
        SELECT *
        FROM usuarios AS u
        WHERE u.cedula = u_cedula
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este usuario no existe';
    END IF;

    SELECT u.nombre, u.apellido, u.cedula, u.telefono, u.usuario, u.contrasena, r.nombre
    FROM usuarios AS u
    INNER JOIN roles AS r
    ON u.id_rol = r.id
    WHERE u.cedula = u_cedula;

END //

DELIMITER ; 

DELIMITER //

CREATE PROCEDURE sp_buscar_usuario_ID(
    IN u_id INT
)
BEGIN

    IF NOT EXISTS (
        SELECT *
        FROM usuarios AS u
        WHERE u.id = u_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este usuario no existe';
    END IF;
    SELECT u.id, u.nombre, u.apellido, u.cedula, u.telefono, u.usuario, u.contrasena, r.nombre
    FROM usuarios AS u
    INNER JOIN roles AS r
    ON u.id_rol = r.id
    WHERE u.id = u_id;
END //

DELIMITER ; 

DELIMITER //

CREATE PROCEDURE sp_eliminar_usuario(
    IN u_cedula INT
)
BEGIN
    DECLARE u_existe INT DEFAULT 0;
    DECLARE mensaje_error VARCHAR(100);

    SELECT COUNT(*)
    INTO u_existe
    FROM usuarios
    WHERE cedula = u_cedula;

    IF u_existe = 0 THEN
        SET mensaje_error = CONCAT('El usuario con cedula [', u_cedula, '] no existe.');
        SIGNAL SQLSTATE '45000' -- Interrumpe o corta la operacion
        SET MESSAGE_TEXT = mensaje_error;
    END IF;

    DELETE FROM usuarios
    WHERE cedula = u_cedula;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_obtener_usuarios()
BEGIN

    DECLARE cant_usuarios INT DEFAULT 0;

    SELECT COUNT(*) INTO cant_usuarios
    FROM usuarios;

    IF cant_usuarios = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay usuarios registrados';
    END IF;

    SELECT u.nombre, u.apellido, u.cedula, u.telefono, u.usuario, u.contrasena, r.nombre
    FROM usuarios AS u
    INNER JOIN roles AS r 
    ON u.id_rol = r.id;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_iniciar_sesion(
    IN u_usuario VARCHAR(50),
    IN u_contrasena VARCHAR(50)
)
BEGIN
    
    IF NOT EXISTS(
        SELECT *
        FROM usuarios AS u
        WHERE u.usuario = u_usuario AND u.contrasena = u_contrasena
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no registrado';
    END IF;

    SELECT 
        u.id, 
        u.nombre, 
        u.apellido, 
        u.cedula, 
        u.telefono, 
        u.usuario, 
        u.contrasena, 
        r.nombre
    FROM usuarios AS u
    INNER JOIN roles AS r
    ON u.id_rol = r.id
    WHERE u.usuario = u_usuario AND u.contrasena = u_contrasena;

END //

DELIMITER ;

-- PROCEDURES VENTAS

DROP PROCEDURE IF EXISTS sp_registrar_venta;
DROP PROCEDURE IF EXISTS sp_registrar_detalles_venta;
DROP PROCEDURE IF EXISTS sp_realizar_venta;
DROP PROCEDURE IF EXISTS sp_obtener_ventas;
DROP PROCEDURE IF EXISTS sp_eliminar_venta;
DROP PROCEDURE IF EXISTS sp_buscar_venta;
DROP PROCEDURE IF EXISTS sp_buscar_detalles_venta;

DELIMITER //

CREATE PROCEDURE sp_registrar_venta(
    IN id_usuario_in INT,
    IN items_in INT,
    IN metodo_in VARCHAR(50),
    OUT id_venta INT
)
BEGIN
    INSERT INTO ventas(id_usuario, fecha, hora, items, metodo, total)
    VALUES(
        id_usuario_in, 
        CURDATE(), -- Fecha: YYYY-MM-DD
        CURTIME(), -- Hora: HH:MM:SS
        items_in, 
        metodo_in, 
        0
    );
    SET id_venta = LAST_INSERT_ID();
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_registrar_detalles_venta(
    IN id_venta_in INT,
    IN codigo_p_in VARCHAR(4),
    IN cantidad_c_in INT
)
BEGIN
    DECLARE precio_p INT;

    SELECT valor_u INTO precio_p
    FROM productos
    WHERE codigo = codigo_p_in;

    INSERT INTO detalles_ventas(id_venta, codigo_p, cantidad_c, subtotal)
    VALUES(id_venta_in, codigo_p_in, cantidad_c_in, (cantidad_c_in * precio_p));
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_realizar_venta(
    IN id_usuario_in INT,
    IN metodo_in VARCHAR(50),
    IN productos JSON
)
BEGIN

    DECLARE i INT DEFAULT 0;
    DECLARE items INT; -- Total de productos comprados
    DECLARE total_v INT; -- Total $ de la venta
    DECLARE codigo_p VARCHAR(4);
    DECLARE cantidad_c INT;
    DECLARE id_venta_temp INT;
    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    START TRANSACTION;
        SET items = JSON_LENGTH(productos);
        CALL sp_registrar_venta(id_usuario_in, items, metodo_in, id_venta_temp);
        WHILE i < items DO

            SET codigo_p = JSON_UNQUOTE(
                JSON_EXTRACT(productos, CONCAT('$[', i, '].codigo'))
            );
            SET cantidad_c = JSON_UNQUOTE(
                JSON_EXTRACT(productos, CONCAT('$[', i, '].cantidad'))
            );
            CALL sp_registrar_detalles_venta(id_venta_temp, codigo_p, cantidad_c);
            SET i = i + 1;
        END WHILE;
        SELECT IFNULL(SUM(subtotal), 0) INTO total_v
        FROM detalles_ventas
        WHERE id_venta = id_venta_temp;
        UPDATE ventas
        SET total = total_v
        WHERE id_venta = id_venta_temp;
    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_buscar_ventas(
    IN v_fecha_inicio DATE,
    IN v_fecha_fin DATE
)
BEGIN
    IF v_fecha_inicio IS NULL OR v_fecha_fin IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Debe especificar ambas fechas';
    END IF;

    IF v_fecha_inicio > v_fecha_fin THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha inicial no puede ser mayor que la fecha final';
    END IF;

    SELECT
        v.id_venta,
        CONCAT(u.nombre, ' ', u.apellido) AS usuario,
        v.fecha,
        v.hora,
        v.items,
        v.metodo,
        v.total
    FROM ventas AS v
    INNER JOIN usuarios AS u
        ON v.id_usuario = u.id
    WHERE v.fecha BETWEEN v_fecha_inicio AND v_fecha_fin
    ORDER BY v.fecha DESC;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_buscar_detalles_venta(
    IN v_id_venta INT 
)
BEGIN   
    SELECT p.nombre_p, d.cantidad_c, p.valor_u, d.subtotal
    FROM detalles_ventas AS d
    INNER JOIN productos AS p
    ON d.codigo_p = p.codigo
    WHERE d.id_venta = v_id_venta;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_obtener_ventas()
BEGIN
    DECLARE cant_ventas INT DEFAULT 0;

    SELECT COUNT(*) 
    INTO cant_ventas
    FROM ventas;

    SELECT
        v.id_venta,
        CONCAT(u.nombre, ' ', u.apellido) AS usuario,
        v.fecha,
        v.hora,
        v.items,
        v.metodo,
        v.total
    FROM ventas AS v
    INNER JOIN usuarios AS u
        ON v.id_usuario = u.id
    ORDER BY v.id_venta DESC;

END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_eliminar_venta(
    IN p_id_venta INT
)
BEGIN

    DECLARE v_existe INT DEFAULT 0;

    SELECT COUNT(*)
    INTO v_existe
    FROM ventas
    WHERE id_venta = p_id_venta;

    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La venta no existe';
    END IF;

    UPDATE productos p
    INNER JOIN detalles_ventas dv
        ON p.codigo = dv.codigo_p
    SET p.stock = p.stock + dv.cantidad_c
    WHERE dv.id_venta = p_id_venta;

    DELETE FROM ventas
    WHERE id_venta = p_id_venta;

END //

DELIMITER ;

-- PROCEDURES INFORMES

DROP PROCEDURE IF EXISTS sp_informe_inventario;
DROP PROCEDURE IF EXISTS sp_informe_ventas_hoy;

DELIMITER //

CREATE PROCEDURE sp_informe_inventario(
   OUT p_en_inventario INT,
   OUT p_valor_inventario INT,
   OUT p_stock_bajo INT
)
BEGIN
    SELECT COUNT(*), IFNULL(SUM(stock*valor_u), 0), COUNT(
        CASE
            WHEN stock <= stock_m THEN 1
        END
    )
    INTO p_en_inventario, p_valor_inventario, p_stock_bajo
    FROM productos;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_informe_ventas_hoy(
   OUT ventas_hoy INT,
   OUT valor_ventas_hoy INT
)
BEGIN
    SELECT IFNULL(COUNT(*), 0), IFNULL(SUM(total), 0)
    INTO ventas_hoy, valor_ventas_hoy
    FROM ventas
    WHERE fecha = CURDATE();
END //

DELIMITER ;