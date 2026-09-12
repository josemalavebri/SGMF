USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Reporte_Ingresos
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   m.IdMovimiento,
           ti.Nombre AS TipoIngreso,
           m.Monto,
           m.Descripcion,
           m.Fecha
  FROM     Movimiento AS m
           INNER JOIN
           TipoIngreso AS ti
           ON m.IdTipoIngreso = ti.IdTipoIngreso
  WHERE    m.IdTipoMovimiento = 1
  ORDER BY m.Fecha DESC, m.IdMovimiento DESC;
END