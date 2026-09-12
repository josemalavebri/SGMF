USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_TipoIngreso_GetAll
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   IdTipoIngreso,
           Nombre,
           Activo
  FROM     TipoIngreso
  WHERE    Activo = 1
  ORDER BY Nombre;
END