USE bd_sistema_ventas;

DROP TRIGGER IF EXISTS tr_descontar_stock;
DROP TRIGGER IF EXISTS tr_validar_stock;
DROP TRIGGER IF EXISTS tr_validar_total_venta;
DROP TRIGGER IF EXISTS tr_verificar_stock;

DELIMITER //

CREATE TRIGGER tr_descontar_stock
AFTER INSERT ON detalles_ventas
FOR EACH ROW
BEGIN

    UPDATE productos
    SET stock = stock - NEW.cantidad_c
    WHERE codigo = NEW.codigo_p;

END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_validar_stock
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN

    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El stock no puede ser negativo';
    END IF;

END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER tr_validar_total_venta
BEFORE UPDATE ON ventas
FOR EACH ROW
BEGIN

    IF NEW.total < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El total de la venta es invalido';
    END IF;

END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_verificar_stock
BEFORE INSERT ON detalles_ventas
FOR EACH ROW
BEGIN

    DECLARE stock_actual INT;

    SELECT stock
    INTO stock_actual
    FROM productos
    WHERE codigo = NEW.codigo_p;

    IF stock_actual < NEW.cantidad_c THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;

END //

DELIMITER ;