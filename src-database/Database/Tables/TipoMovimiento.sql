
CREATE TABLE dbo.TipoMovimiento
(
    IdTipoMovimiento INT IDENTITY(1, 1) NOT NULL,
    Nombre VARCHAR(20) NOT NULL,

    CONSTRAINT PK_TipoMovimiento
        PRIMARY KEY (IdTipoMovimiento),

    CONSTRAINT UQ_TipoMovimiento_Nombre
        UNIQUE (Nombre)
);
