
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    DECLARE @Ingreso INT;
    DECLARE @Egreso INT;
    DECLARE @Salario INT;
    DECLARE @Responsabilidades INT;
    DECLARE @GastosHormiga INT;

    SELECT @Ingreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Ingreso';

    SELECT @Egreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Egreso';

    SELECT @Salario = IdTipoIngreso
    FROM dbo.TipoIngreso
    WHERE Nombre = 'Salario';

    SELECT @Responsabilidades = IdCategoriaEgreso
    FROM dbo.CategoriaEgreso
    WHERE Nombre = 'Responsabilidades';

    SELECT @GastosHormiga = IdCategoriaEgreso
    FROM dbo.CategoriaEgreso
    WHERE Nombre = 'Gastos hormiga';

    IF @Ingreso IS NULL
       OR @Egreso IS NULL
       OR @Salario IS NULL
       OR @Responsabilidades IS NULL
       OR @GastosHormiga IS NULL
    BEGIN
        ;THROW 50010, 'Faltan datos iniciales necesarios para las pruebas.', 1;
    END;

    INSERT INTO dbo.Movimiento
    (
        IdTipoMovimiento,
        IdTipoIngreso,
        IdCategoriaEgreso,
        Monto,
        Descripcion
    )
    VALUES
        (@Ingreso, @Salario, NULL, 800.00, 'Salario mensual'),
        (@Egreso, NULL, @Responsabilidades, 50.00, 'Pago de internet'),
        (@Egreso, NULL, @GastosHormiga, 2.50, 'Refresco');

    -- Comprobación temporal de los registros insertados.
    SELECT *
    FROM dbo.Movimiento
    WHERE Descripcion IN
    (
        'Salario mensual',
        'Pago de internet',
        'Refresco'
    );

    -- Las pruebas no dejarán datos persistentes.
    ROLLBACK TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
