GO
CREATE OR ALTER PROCEDURE usp_CategoriaEgreso_Delete
@IdCategoriaEgreso INT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE CategoriaEgreso
  SET    Activo = 0
  WHERE  IdCategoriaEgreso = @IdCategoriaEgreso;
END
GO