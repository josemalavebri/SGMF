
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
        REFERENCES dbo.CategoriaEgreso (IdCategoriaEgreso)
);
