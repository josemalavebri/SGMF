CREATE PROCEDURE dbo.usp_CategoriaEgreso_Create
@Nombre VARCHAR (50)
AS
BEGIN
  SET NOCOUNT ON;
  INSERT  INTO CategoriaEgreso (
    Nombre
  )
  VALUES                      (@Nombre);
  SELECT CAST (SCOPE_IDENTITY() AS INT) AS IdCategoriaEgreso;
END