
-- Tipos de movimiento
IF EXISTS
(
    SELECT 1
    FROM dbo.TipoMovimiento
    WHERE (IdTipoMovimiento = 1 AND Nombre <> 'Ingreso')
       OR (IdTipoMovimiento = 2 AND Nombre <> 'Egreso')
       OR (Nombre = 'Ingreso' AND IdTipoMovimiento <> 1)
       OR (Nombre = 'Egreso' AND IdTipoMovimiento <> 2)
)
BEGIN
    ;THROW 50001, 'Los tipos de movimiento no coinciden con los identificadores esperados.', 1;
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoMovimiento
    WHERE IdTipoMovimiento = 1
      AND Nombre = 'Ingreso'
)
BEGIN
    SET IDENTITY_INSERT dbo.TipoMovimiento ON;

    INSERT INTO dbo.TipoMovimiento (IdTipoMovimiento, Nombre)
    VALUES (1, 'Ingreso');

    SET IDENTITY_INSERT dbo.TipoMovimiento OFF;
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoMovimiento
    WHERE IdTipoMovimiento = 2
      AND Nombre = 'Egreso'
)
BEGIN
    SET IDENTITY_INSERT dbo.TipoMovimiento ON;

    INSERT INTO dbo.TipoMovimiento (IdTipoMovimiento, Nombre)
    VALUES (2, 'Egreso');

    SET IDENTITY_INSERT dbo.TipoMovimiento OFF;
END;
GO

-- Tipos de ingreso
IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Salario'
)
BEGIN
    INSERT INTO dbo.TipoIngreso (Nombre)
    VALUES ('Salario');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Trabajo pequeño'
)
BEGIN
    INSERT INTO dbo.TipoIngreso (Nombre)
    VALUES ('Trabajo pequeño');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Venta'
)
BEGIN
    INSERT INTO dbo.TipoIngreso (Nombre)
    VALUES ('Venta');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Regalo'
)
BEGIN
    INSERT INTO dbo.TipoIngreso (Nombre)
    VALUES ('Regalo');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Otros'
)
BEGIN
    INSERT INTO dbo.TipoIngreso (Nombre)
    VALUES ('Otros');
END;
GO

-- Categorías de egreso
IF NOT EXISTS
(
    SELECT 1
    FROM dbo.CategoriaEgreso
    WHERE Nombre = 'Gastos hormiga'
)
BEGIN
    INSERT INTO dbo.CategoriaEgreso (Nombre)
    VALUES ('Gastos hormiga');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.CategoriaEgreso
    WHERE Nombre = 'Responsabilidades'
)
BEGIN
    INSERT INTO dbo.CategoriaEgreso (Nombre)
    VALUES ('Responsabilidades');
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.CategoriaEgreso
    WHERE Nombre = 'Otros'
)
BEGIN
    INSERT INTO dbo.CategoriaEgreso (Nombre)
    VALUES ('Otros');
END;
GO
