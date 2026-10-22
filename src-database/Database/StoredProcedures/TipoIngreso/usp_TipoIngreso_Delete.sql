GO
CREATE OR ALTER PROCEDURE usp_TipoIngreso_Delete
@IdTipoIngreso INT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE TipoIngreso
  SET    Activo = 0
  WHERE  IdTipoIngreso = @IdTipoIngreso;
END
GO