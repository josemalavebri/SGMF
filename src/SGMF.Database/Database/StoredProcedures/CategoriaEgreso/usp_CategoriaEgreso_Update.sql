USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_CategoriaEgreso_Update
@IdCategoriaEgreso INT, @Nombre VARCHAR (50)
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE CategoriaEgreso
  SET    Nombre = @Nombre
  WHERE  IdCategoriaEgreso = @IdCategoriaEgreso
         AND Activo = 1;
END