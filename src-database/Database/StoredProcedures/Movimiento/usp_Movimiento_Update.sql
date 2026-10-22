
CREATE OR ALTER PROCEDURE dbo.usp_Movimiento_Update
    @IdMovimiento INT,
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
    DECLARE @TipoIngresoActual INT;
    DECLARE @CategoriaActual INT;

    SELECT @IdIngreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Ingreso';

    SELECT @IdEgreso = IdTipoMovimiento
    FROM dbo.TipoMovimiento
    WHERE Nombre = 'Egreso';

    IF @IdIngreso IS NULL OR @IdEgreso IS NULL
        THROW 50101, 'No están configurados los tipos Ingreso y Egreso.', 1;

    IF @IdTipoMovimiento NOT IN (@IdIngreso, @IdEgreso)
        THROW 50102, 'El tipo de movimiento no es válido.', 1;

    IF @Monto IS NULL OR @Monto <= 0
        THROW 50103, 'El monto debe ser mayor que cero.', 1;

    IF @Descripcion IS NULL OR LEN(LTRIM(RTRIM(@Descripcion))) = 0
        THROW 50104, 'La descripción es obligatoria.', 1;

    SELECT
        @TipoIngresoActual = IdTipoIngreso,
        @CategoriaActual = IdCategoriaEgreso
    FROM dbo.Movimiento
    WHERE IdMovimiento = @IdMovimiento;

    IF @@ROWCOUNT = 0
        THROW 50105, 'El movimiento no existe.', 1;

    IF @IdTipoMovimiento = @IdIngreso
    BEGIN
        IF @IdTipoIngreso IS NULL OR @IdCategoriaEgreso IS NOT NULL
            THROW 50106, 'Un ingreso requiere un tipo de ingreso y no admite categoría de egreso.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM dbo.TipoIngreso
            WHERE IdTipoIngreso = @IdTipoIngreso
              AND (
                  Activo = 1
                  OR @IdTipoIngreso = @TipoIngresoActual
              )
        )
            THROW 50107, 'El tipo de ingreso no existe o está inactivo.', 1;
    END
    ELSE
    BEGIN
        IF @IdCategoriaEgreso IS NULL OR @IdTipoIngreso IS NOT NULL
            THROW 50108, 'Un egreso requiere una categoría y no admite tipo de ingreso.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM dbo.CategoriaEgreso
            WHERE IdCategoriaEgreso = @IdCategoriaEgreso
              AND (
                  Activo = 1
                  OR @IdCategoriaEgreso = @CategoriaActual
              )
        )
            THROW 50109, 'La categoría de egreso no existe o está inactiva.', 1;
    END;

    UPDATE dbo.Movimiento
    SET
        IdTipoMovimiento = @IdTipoMovimiento,
        IdTipoIngreso = @IdTipoIngreso,
        IdCategoriaEgreso = @IdCategoriaEgreso,
        Monto = @Monto,
        Descripcion = @Descripcion
    WHERE IdMovimiento = @IdMovimiento;
END;
GO
