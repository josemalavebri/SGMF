USE SGMF;


GO
INSERT  INTO TipoMovimiento (
  Nombre
)
VALUES                     ('Ingreso'),
('Egreso');


GO
INSERT  INTO TipoIngreso (
  Nombre
)
VALUES                  ('Salario'),
('Trabajo pequeño'),
('Venta'),
('Regalo'),
('Otros');


GO
INSERT  INTO CategoriaEgreso (
  Nombre
)
VALUES                      ('Gastos hormiga'),
('Responsabilidades'),
('Otros');