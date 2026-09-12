USE SGMF;


GO
DECLARE @Ingreso AS INT;

DECLARE @Egreso AS INT;

DECLARE @Salario AS INT;

DECLARE @Responsabilidades AS INT;

DECLARE @GastosHormiga AS INT;

SELECT @Ingreso = IdTipoMovimiento
FROM   TipoMovimiento
WHERE  Nombre = 'Ingreso';

SELECT @Egreso = IdTipoMovimiento
FROM   TipoMovimiento
WHERE  Nombre = 'Egreso';

SELECT @Salario = IdTipoIngreso
FROM   TipoIngreso
WHERE  Nombre = 'Salario';

SELECT @Responsabilidades = IdCategoriaEgreso
FROM   CategoriaEgreso
WHERE  Nombre = 'Responsabilidades';

SELECT @GastosHormiga = IdCategoriaEgreso
FROM   CategoriaEgreso
WHERE  Nombre = 'Gastos hormiga';

INSERT  INTO Movimiento (
  IdTipoMovimiento,
  IdTipoIngreso,
  IdCategoriaEgreso,
  Monto,
  Descripcion
)
VALUES                 (@Ingreso, @Salario, NULL, 800.00, 'Salario mensual'),
(@Egreso, NULL, @Responsabilidades, 50.00, 'Pago de internet'),
(@Egreso, NULL, @GastosHormiga, 2.50, 'Refresco');