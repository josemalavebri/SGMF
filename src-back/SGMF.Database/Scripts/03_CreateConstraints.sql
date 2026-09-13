USE SGMF;
GO

ALTER TABLE Movimiento
ADD CONSTRAINT CK_Movimiento_Monto
CHECK (Monto > 0);
GO

ALTER TABLE Movimiento
ADD CONSTRAINT CK_Movimiento_Tipo
CHECK (
    (
        IdTipoMovimiento = 1
        AND IdTipoIngreso IS NOT NULL
        AND IdCategoriaEgreso IS NULL
    )
    OR
    (
        IdTipoMovimiento = 2
        AND IdTipoIngreso IS NULL
        AND IdCategoriaEgreso IS NOT NULL
    )
);
GO