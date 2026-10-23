
CREATE VIEW dbo.vw_Movimientos
AS
SELECT
    m.IdMovimiento,
    tm.Nombre AS TipoMovimiento,
    ti.Nombre AS TipoIngreso,
    ce.Nombre AS CategoriaEgreso,
    m.Monto,
    m.Descripcion,
    m.Fecha
FROM dbo.Movimiento AS m
INNER JOIN dbo.TipoMovimiento AS tm
    ON m.IdTipoMovimiento = tm.IdTipoMovimiento
LEFT JOIN dbo.TipoIngreso AS ti
    ON m.IdTipoIngreso = ti.IdTipoIngreso
LEFT JOIN dbo.CategoriaEgreso AS ce
    ON m.IdCategoriaEgreso = ce.IdCategoriaEgreso;
