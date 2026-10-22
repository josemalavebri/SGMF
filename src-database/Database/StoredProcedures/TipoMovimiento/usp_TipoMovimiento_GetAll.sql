GO
CREATE OR ALTER PROCEDURE usp_TipoMovimiento_GetAll
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   IdTipoMovimiento,
           Nombre
  FROM     TipoMovimiento
  ORDER BY IdTipoMovimiento;
END
GO