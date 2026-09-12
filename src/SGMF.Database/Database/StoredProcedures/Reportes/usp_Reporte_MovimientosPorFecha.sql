USE SGMF;


GO
CREATE OR ALTER PROCEDURE usp_Reporte_MovimientosPorFecha
@FechaInicio DATETIME2, @FechaFin DATETIME2
AS
BEGIN
  SET NOCOUNT ON;
  SELECT   m.IdMovimiento,
           tm.Nombre AS TipoMovimiento,
           ti.Nombre AS TipoIngreso,
           ce.Nombre AS CategoriaEgreso,
           m.Monto,
           m.Descripcion,
           m.Fecha
  FROM     Movimiento AS m
           INNER JOIN
           TipoMovimiento AS tm
           ON m.IdTipoMovimiento = tm.IdTipoMovimiento
           LEFT OUTER JOIN
           TipoIngreso AS ti
           ON m.IdTipoIngreso = ti.IdTipoIngreso
           LEFT OUTER JOIN
           CategoriaEgreso AS ce
           ON m.IdCategoriaEgreso = ce.IdCategoriaEgreso
  WHERE    m.Fecha >= @FechaInicio
           AND m.Fecha < @FechaFin
  ORDER BY m.Fecha DESC, m.IdMovimiento DESC;
END