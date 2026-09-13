GO
CREATE OR ALTER PROCEDURE usp_Movimiento_Delete
@IdMovimiento INT
AS
BEGIN
  SET NOCOUNT ON;
  DELETE Movimiento
  WHERE  IdMovimiento = @IdMovimiento;
END
GO