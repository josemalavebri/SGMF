
CREATE TABLE dbo.CategoriaEgreso
(
    IdCategoriaEgreso INT IDENTITY(1, 1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Activo BIT NOT NULL
        CONSTRAINT DF_CategoriaEgreso_Activo DEFAULT (1),

    CONSTRAINT PK_CategoriaEgreso
        PRIMARY KEY (IdCategoriaEgreso),

    CONSTRAINT UQ_CategoriaEgreso_Nombre
        UNIQUE (Nombre)
);
