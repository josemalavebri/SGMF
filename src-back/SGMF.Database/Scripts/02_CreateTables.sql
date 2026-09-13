USE SGMF;
GO

CREATE TABLE TipoMovimiento (
    IdTipoMovimiento INT IDENTITY (1, 1) PRIMARY KEY,
    Nombre VARCHAR (20) NOT NULL UNIQUE
);
GO

CREATE TABLE TipoIngreso (
    IdTipoIngreso INT IDENTITY (1, 1) PRIMARY KEY,
    Nombre VARCHAR (50) NOT NULL UNIQUE,
    Activo BIT DEFAULT 1 NOT NULL
);
GO

CREATE TABLE CategoriaEgreso (
    IdCategoriaEgreso INT IDENTITY (1, 1) PRIMARY KEY,
    Nombre VARCHAR (50) NOT NULL UNIQUE,
    Activo BIT DEFAULT 1 NOT NULL
);
GO

CREATE TABLE Movimiento (
    IdMovimiento INT IDENTITY (1, 1) PRIMARY KEY,
    IdTipoMovimiento INT NOT NULL,
    IdTipoIngreso INT NULL,
    IdCategoriaEgreso INT NULL,
    Monto DECIMAL (12, 2) NOT NULL,
    Descripcion VARCHAR (200) NOT NULL,
    Fecha DATETIME2 DEFAULT SYSDATETIME() NOT NULL,
    CONSTRAINT FK_Movimiento_TipoMovimiento
        FOREIGN KEY (IdTipoMovimiento)
        REFERENCES TipoMovimiento (IdTipoMovimiento),
    CONSTRAINT FK_Movimiento_TipoIngreso
        FOREIGN KEY (IdTipoIngreso)
        REFERENCES TipoIngreso (IdTipoIngreso),
    CONSTRAINT FK_Movimiento_CategoriaEgreso
        FOREIGN KEY (IdCategoriaEgreso)
        REFERENCES CategoriaEgreso (IdCategoriaEgreso)
);
GO