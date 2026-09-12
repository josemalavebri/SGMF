USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Reporte_Egresos
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   m.IdMovimiento,
           ce.Nombre AS CategoriaEgreso,
           m.Monto,
           m.Descripcion,
           m.Fecha
  FROM     Movimiento AS m
           INNER JOIN
           CategoriaEgreso AS ce
           ON m.IdCategoriaEgreso = ce.IdCategoriaEgreso
  WHERE    m.IdTipoMovimiento = 2
  ORDER BY m.Fecha DESC, m.IdMovimiento DESC;
END