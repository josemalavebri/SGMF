USE SGMF;
GO

DECLARE @IdIngreso INT;
DECLARE @IdEgreso INT;

SELECT @IdIngreso = IdTipoMovimiento
FROM dbo.TipoMovimiento
WHERE Nombre = 'Ingreso';

SELECT @IdEgreso = IdTipoMovimiento
FROM dbo.TipoMovimiento
WHERE Nombre = 'Egreso';

IF @IdIngreso IS NULL OR @IdEgreso IS NULL
BEGIN
    THROW 50001,
        'Deben existir los tipos de movimiento Ingreso y Egreso.',
        1;
END;

IF @IdIngreso = @IdEgreso
BEGIN
    THROW 50002,
        'Ingreso y Egreso deben tener identificadores distintos.',
        1;
END;
GO