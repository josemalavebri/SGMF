USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Movimiento_GetAll
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   IdMovimiento,
           IdTipoMovimiento,
           IdTipoIngreso,
           IdCategoriaEgreso,
           Monto,
           Descripcion,
           Fecha
  FROM     Movimiento
  ORDER BY Fecha DESC, IdMovimiento DESC;
END