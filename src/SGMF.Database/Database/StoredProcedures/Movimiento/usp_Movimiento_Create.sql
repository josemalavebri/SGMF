USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Movimiento_Create
@IdTipoMovimiento INT, @IdTipoIngreso INT=NULL, @IdCategoriaEgreso INT=NULL, @Monto DECIMAL (12, 2), @Descripcion VARCHAR (200)
AS
BEGIN
  SET NOCOUNT ON;
  INSERT  INTO Movimiento (
    IdTipoMovimiento,
    IdTipoIngreso,
    IdCategoriaEgreso,
    Monto,
    Descripcion
  )
  VALUES                 (@IdTipoMovimiento, @IdTipoIngreso, @IdCategoriaEgreso, @Monto, @Descripcion);
  SELECT CAST (SCOPE_IDENTITY() AS INT) AS IdMovimiento;
END