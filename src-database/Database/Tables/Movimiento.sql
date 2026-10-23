CREATE TABLE dbo.Movimiento
(
    IdMovimiento INT IDENTITY(1, 1) NOT NULL,
    IdTipoMovimiento INT NOT NULL,
    IdTipoIngreso INT NULL,
    IdCategoriaEgreso INT NULL,
    Monto DECIMAL(12, 2) NOT NULL,
    Descripcion VARCHAR(200) NOT NULL,
    Fecha DATETIME2 NOT NULL
        CONSTRAINT DF_Movimiento_Fecha DEFAULT (SYSDATETIME()),

    CONSTRAINT PK_Movimiento
        PRIMARY KEY (IdMovimiento),

    CONSTRAINT FK_Movimiento_TipoMovimiento
        FOREIGN KEY (IdTipoMovimiento)
        REFERENCES dbo.TipoMovimiento (IdTipoMovimiento),

    CONSTRAINT FK_Movimiento_TipoIngreso
        FOREIGN KEY (IdTipoIngreso)
        REFERENCES dbo.TipoIngreso (IdTipoIngreso),

    CONSTRAINT FK_Movimiento_CategoriaEgreso
        FOREIGN KEY (IdCategoriaEgreso)
        REFERENCES dbo.CategoriaEgreso (IdCategoriaEgreso),

    CONSTRAINT CK_Movimiento_TipoRelacionado
        CHECK
        (
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
        ),

    INDEX IX_Movimiento_Fecha
        NONCLUSTERED (Fecha),

    INDEX IX_Movimiento_TipoMovimiento
        NONCLUSTERED (IdTipoMovimiento),

    INDEX IX_Movimiento_TipoIngreso
        NONCLUSTERED (IdTipoIngreso),

    INDEX IX_Movimiento_CategoriaEgreso
        NONCLUSTERED (IdCategoriaEgreso)
);