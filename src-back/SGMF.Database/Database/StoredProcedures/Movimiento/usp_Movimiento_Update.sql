GO
CREATE OR ALTER PROCEDURE usp_Movimiento_Update
@IdMovimiento INT, @IdTipoMovimiento INT, @IdTipoIngreso INT=NULL, @IdCategoriaEgreso INT=NULL, @Monto DECIMAL (12, 2), @Descripcion VARCHAR (200)
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE Movimiento
  SET    IdTipoMovimiento  = @IdTipoMovimiento,
         IdTipoIngreso     = @IdTipoIngreso,
         IdCategoriaEgreso = @IdCategoriaEgreso,
         Monto             = @Monto,
         Descripcion       = @Descripcion
  WHERE  IdMovimiento = @IdMovimiento;
END
GO