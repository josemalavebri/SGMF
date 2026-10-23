
CREATE PROCEDURE dbo.usp_Movimiento_Create
    @IdTipoMovimiento INT,
    @IdTipoIngreso INT = NULL,
    @IdCategoriaEgreso INT = NULL,
    @Monto DECIMAL(12, 2),
    @Descripcion VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @IdIngreso INT;
    DECLARE @IdEgreso INT;

    SELECT @IdIngreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Ingreso';

    SELECT @IdEgreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Egreso';

    IF @IdIngreso IS NULL OR @IdEgreso IS NULL
        THROW 50001, 'No están configurados los tipos Ingreso y Egreso.', 1;

    IF @IdTipoMovimiento NOT IN (@IdIngreso, @IdEgreso)
        THROW 50002, 'El tipo de movimiento no es válido.', 1;

    IF @Monto IS NULL OR @Monto <= 0
        THROW 50003, 'El monto debe ser mayor que cero.', 1;

    IF @Descripcion IS NULL OR LEN(LTRIM(RTRIM(@Descripcion))) = 0
        THROW 50004, 'La descripción es obligatoria.', 1;

    IF @IdTipoMovimiento = @IdIngreso
    BEGIN
        IF @IdTipoIngreso IS NULL OR @IdCategoriaEgreso IS NOT NULL
            THROW 50005, 'Un ingreso requiere un tipo de ingreso y no admite categoría de egreso.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM dbo.TipoIngreso
            WHERE IdTipoIngreso = @IdTipoIngreso
              AND Activo = 1
        )
            THROW 50006, 'El tipo de ingreso no existe o está inactivo.', 1;
    END
    ELSE
    BEGIN
        IF @IdCategoriaEgreso IS NULL OR @IdTipoIngreso IS NOT NULL
            THROW 50007, 'Un egreso requiere una categoría y no admite tipo de ingreso.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM dbo.CategoriaEgreso
            WHERE IdCategoriaEgreso = @IdCategoriaEgreso
              AND Activo = 1
        )
            THROW 50008, 'La categoría de egreso no existe o está inactiva.', 1;
    END;

    INSERT INTO dbo.Movimiento (
        IdTipoMovimiento,
        IdTipoIngreso,
        IdCategoriaEgreso,
        Monto,
        Descripcion
    )
    VALUES (
        @IdTipoMovimiento,
        @IdTipoIngreso,
        @IdCategoriaEgreso,
        @Monto,
        @Descripcion
    );

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS IdMovimiento;
END;
