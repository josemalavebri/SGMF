GO
CREATE OR ALTER PROCEDURE usp_Reporte_Balance
AS
BEGIN
  SET NOCOUNT ON;
  SELECT ISNULL(SUM(CASE WHEN IdTipoMovimiento = 1 THEN Monto ELSE 0 END), 0) AS TotalIngresos,
         ISNULL(SUM(CASE WHEN IdTipoMovimiento = 2 THEN Monto ELSE 0 END), 0) AS TotalEgresos,
         ISNULL(SUM(CASE WHEN IdTipoMovimiento = 1 THEN Monto WHEN IdTipoMovimiento = 2 THEN -Monto ELSE 0 END), 0) AS Saldo
  FROM   Movimiento;
END
GO