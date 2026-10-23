
CREATE TABLE dbo.TipoIngreso
(
    IdTipoIngreso INT IDENTITY(1, 1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Activo BIT NOT NULL
        CONSTRAINT DF_TipoIngreso_Activo DEFAULT (1),

    CONSTRAINT PK_TipoIngreso
        PRIMARY KEY (IdTipoIngreso),

    CONSTRAINT UQ_TipoIngreso_Nombre
        UNIQUE (Nombre)
);
