USE SGMF;


GO
IF NOT EXISTS (SELECT 1
               FROM   TipoMovimiento
               WHERE  Nombre = 'Ingreso')
  BEGIN
    INSERT  INTO TipoMovimiento (
      Nombre
    )
    VALUES                     ('Ingreso');
  END

IF NOT EXISTS (SELECT 1
               FROM   TipoMovimiento
               WHERE  Nombre = 'Egreso')
  BEGIN
    INSERT  INTO TipoMovimiento (
      Nombre
    )
    VALUES                     ('Egreso');
  END


GO
IF NOT EXISTS (SELECT 1
               FROM   TipoIngreso
               WHERE  Nombre = 'Salario')
  BEGIN
    INSERT  INTO TipoIngreso (
      Nombre
    )
    VALUES                  ('Salario');
  END

IF NOT EXISTS (SELECT 1
               FROM   TipoIngreso
               WHERE  Nombre = 'Trabajo pequeño')
  BEGIN
    INSERT  INTO TipoIngreso (
      Nombre
    )
    VALUES                  ('Trabajo pequeño');
  END

IF NOT EXISTS (SELECT 1
               FROM   TipoIngreso
               WHERE  Nombre = 'Venta')
  BEGIN
    INSERT  INTO TipoIngreso (
      Nombre
    )
    VALUES                  ('Venta');
  END

IF NOT EXISTS (SELECT 1
               FROM   TipoIngreso
               WHERE  Nombre = 'Regalo')
  BEGIN
    INSERT  INTO TipoIngreso (
      Nombre
    )
    VALUES                  ('Regalo');
  END

IF NOT EXISTS (SELECT 1
               FROM   TipoIngreso
               WHERE  Nombre = 'Otros')
  BEGIN
    INSERT  INTO TipoIngreso (
      Nombre
    )
    VALUES                  ('Otros');
  END


GO
IF NOT EXISTS (SELECT 1
               FROM   CategoriaEgreso
               WHERE  Nombre = 'Gastos hormiga')
  BEGIN
    INSERT  INTO CategoriaEgreso (
      Nombre
    )
    VALUES                      ('Gastos hormiga');
  END

IF NOT EXISTS (SELECT 1
               FROM   CategoriaEgreso
               WHERE  Nombre = 'Responsabilidades')
  BEGIN
    INSERT  INTO CategoriaEgreso (
      Nombre
    )
    VALUES                      ('Responsabilidades');
  END

IF NOT EXISTS (SELECT 1
               FROM   CategoriaEgreso
               WHERE  Nombre = 'Otros')
  BEGIN
    INSERT  INTO CategoriaEgreso (
      Nombre
    )
    VALUES                      ('Otros');
  END