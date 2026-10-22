GO
CREATE OR ALTER VIEW vw_Movimientos
AS
SELECT
    m.IdMovimiento,
    tm.Nombre AS TipoMovimiento,
    ti.Nombre AS TipoIngreso,
    ce.Nombre AS CategoriaEgreso,
    m.Monto,
    m.Descripcion,
    m.Fecha
FROM Movimiento AS m
INNER JOIN TipoMovimiento AS tm
    ON m.IdTipoMovimiento = tm.IdTipoMovimiento
LEFT JOIN TipoIngreso AS ti
    ON m.IdTipoIngreso = ti.IdTipoIngreso
LEFT JOIN CategoriaEgreso AS ce
    ON m.IdCategoriaEgreso = ce.IdCategoriaEgreso;
GO