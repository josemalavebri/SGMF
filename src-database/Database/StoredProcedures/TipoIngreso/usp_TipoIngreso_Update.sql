GO
CREATE OR ALTER PROCEDURE usp_TipoIngreso_Update
@IdTipoIngreso INT, @Nombre VARCHAR (50)
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE TipoIngreso
  SET    Nombre = @Nombre
  WHERE  IdTipoIngreso = @IdTipoIngreso
         AND Activo = 1;
END
GO