USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Movimiento_GetById
@IdMovimiento INT
AS
BEGIN
  SET NOCOUNT ON;
  SELECT IdMovimiento,
         IdTipoMovimiento,
         IdTipoIngreso,
         IdCategoriaEgreso,
         Monto,
         Descripcion,
         Fecha
  FROM   Movimiento
  WHERE  IdMovimiento = @IdMovimiento;
END