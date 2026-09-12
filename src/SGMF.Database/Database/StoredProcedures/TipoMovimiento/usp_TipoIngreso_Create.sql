USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_TipoIngreso_Create
@Nombre VARCHAR (50)
AS
BEGIN
  SET NOCOUNT ON;
  INSERT  INTO TipoIngreso (
    Nombre
  )
  VALUES                  (@Nombre);
  SELECT CAST (SCOPE_IDENTITY() AS INT) AS IdTipoIngreso;
END