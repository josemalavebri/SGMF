USE SGMF;
GO

CREATE INDEX IX_Movimiento_Fecha
ON Movimiento(Fecha);
GO

CREATE INDEX IX_Movimiento_TipoMovimiento
ON Movimiento(IdTipoMovimiento);
GO

CREATE INDEX IX_Movimiento_TipoIngreso
ON Movimiento(IdTipoIngreso);
GO

CREATE INDEX IX_Movimiento_CategoriaEgreso
ON Movimiento(IdCategoriaEgreso);
GO