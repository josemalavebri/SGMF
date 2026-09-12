GO
CREATE OR ALTER PROCEDURE usp_CategoriaEgreso_GetAll
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   IdCategoriaEgreso,
           Nombre,
           Activo
  FROM     CategoriaEgreso
  WHERE    Activo = 1
  ORDER BY Nombre;
END
GO