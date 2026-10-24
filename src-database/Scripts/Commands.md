# SGMF — Comandos de administración de base de datos

Referencia de comandos para configurar, compilar, publicar, verificar y probar la base de datos SQL Server del proyecto SGMF.

## 1. Entorno

- **Servidor:** `localhost`
- **Instancia:** predeterminada de SQL Server (`MSSQLSERVER`)
- **Base de datos:** `SGMF`
- **Proyecto SQL:** `SGMF.Database.sqlproj`
- **Herramientas:** PowerShell, `sqlcmd`, `dotnet` y `SqlPackage`

Ejecutar los comandos desde la carpeta `src-database`, salvo que se indique otra cosa.

## 2. Comprobar las herramientas

### Verificar .NET

```powershell
dotnet --version
```

### Verificar SQL Server

```powershell
sqlcmd -S "localhost" -E -Q "SELECT @@SERVERNAME AS Servidor, SERVERPROPERTY('InstanceName') AS Instancia;"
```

### Verificar conexión y base de datos

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT DB_NAME() AS BaseDatos, SUSER_SNAME() AS Usuario;"
```

### Instalar SqlPackage si no está instalado

```powershell
dotnet tool install -g microsoft.sqlpackage
```

Si ya está instalado, actualizarlo con:

```powershell
dotnet tool update -g microsoft.sqlpackage
```

Comprobar la instalación:

```powershell
SqlPackage /Version
```

## 3. Compilar el proyecto SQL

```powershell
dotnet build .\SGMF.Database.sqlproj
```

Comprobar que se generó el DACPAC:

```powershell
Test-Path .\bin\Debug\SGMF.Database.dacpac
```

El resultado esperado es `True`.

El DACPAC representa el modelo de base de datos compilado y se utiliza para publicarlo en SQL Server.

## 4. Crear la base de datos

Crear `SGMF` solamente si todavía no existe:

```powershell
sqlcmd -S "localhost" -E -Q "IF DB_ID(N'SGMF') IS NULL CREATE DATABASE [SGMF];"
```

## 5. Generar un informe antes de publicar

```powershell
SqlPackage /Action:DeployReport /SourceFile:".\bin\Debug\SGMF.Database.dacpac" /TargetConnectionString:"Server=localhost;Initial Catalog=SGMF;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;" /OutputPath:".\bin\Debug\SGMF.DeployReport.xml"
```

El informe permite revisar los cambios que se aplicarían al publicar el DACPAC. No publica los cambios por sí mismo.

## 6. Publicar el DACPAC

```powershell
SqlPackage /Action:Publish /SourceFile:".\bin\Debug\SGMF.Database.dacpac" /TargetConnectionString:"Server=localhost;Initial Catalog=SGMF;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;"
```

**Importante:** publicar puede modificar el esquema de la base de datos para ajustarlo al modelo del proyecto. Revisa los cambios antes de ejecutarlo en una base con datos importantes.

## 7. Ejecutar los datos iniciales

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -b -i ".\Data\Seeds\001_InitialData.sql"
```

Este archivo contiene los datos iniciales de tipos de movimiento, tipos de ingreso y categorías de egreso.

## 8. Verificar las tablas

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME;"
```

## 9. Verificar los datos iniciales

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT * FROM dbo.TipoMovimiento; SELECT * FROM dbo.TipoIngreso; SELECT * FROM dbo.CategoriaEgreso;"
```

Comprobar específicamente el nombre `Trabajo pequeño`:

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT IdTipoIngreso, Nombre FROM dbo.TipoIngreso WHERE Nombre LIKE 'Trabajo%';"
```

## 10. Verificar claves foráneas y restricciones CHECK

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT t.name AS Tabla, fk.name AS ClaveForanea FROM sys.foreign_keys fk JOIN sys.tables t ON fk.parent_object_id = t.object_id ORDER BY t.name, fk.name; SELECT t.name AS Tabla, cc.name AS NombreRestriccion, cc.definition AS Regla FROM sys.check_constraints cc JOIN sys.tables t ON cc.parent_object_id = t.object_id ORDER BY t.name, cc.name;"
```

## 11. Verificar vistas y procedimientos almacenados

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT 'Vista' AS TipoObjeto, name AS Nombre FROM sys.views WHERE is_ms_shipped = 0 UNION ALL SELECT 'Procedimiento', name FROM sys.procedures WHERE is_ms_shipped = 0 ORDER BY TipoObjeto, Nombre;"
```

## 12. Verificar índices de Movimiento

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT t.name AS Tabla, i.name AS Indice, i.type_desc AS Tipo FROM sys.indexes i JOIN sys.tables t ON i.object_id = t.object_id WHERE i.name LIKE 'IX_Movimiento_%' ORDER BY i.name;"
```

## 13. Revisar la definición de un procedimiento almacenado

Ejemplo:

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "EXEC sp_help 'dbo.usp_Movimiento_Create';"
```

Para consultar el código SQL de un procedimiento:

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "EXEC sp_helptext 'dbo.usp_Movimiento_Create';"
```

## 14. Ejecutar los datos de prueba

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -b -i ".\Data\TestData\001_TestMovimientos.sql"
```

El archivo de prueba inserta tres movimientos dentro de una transacción y ejecuta `ROLLBACK`, por lo que no deberían quedar guardados.

### Comprobar los movimientos de prueba

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT COUNT(*) AS MovimientosRestantes FROM dbo.Movimiento WHERE Descripcion IN ('Salario mensual', 'Pago de internet', 'Refresco');"
```

El resultado esperado es `0`, siempre que no existan previamente registros reales con esas descripciones.

## 15. Probar la creación de un movimiento

### Crear un ingreso y revertir la inserción

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -b -Q "BEGIN TRANSACTION; EXEC dbo.usp_Movimiento_Create @IdTipoMovimiento = 1, @IdTipoIngreso = 1, @IdCategoriaEgreso = NULL, @Monto = 800.00, @Descripcion = 'Prueba usp_Movimiento_Create'; ROLLBACK TRANSACTION;"
```

### Probar el rechazo de un monto inválido

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -b -Q "EXEC dbo.usp_Movimiento_Create @IdTipoMovimiento = 1, @IdTipoIngreso = 1, @IdCategoriaEgreso = NULL, @Monto = 0, @Descripcion = 'Prueba monto invalido';"
```

El resultado esperado es el error `50003`.

## 16. Consultar los movimientos guardados

```powershell
sqlcmd -S "localhost" -E -d "SGMF" -Q "SELECT COUNT(*) AS TotalMovimientos FROM dbo.Movimiento; SELECT TOP (20) * FROM dbo.Movimiento ORDER BY IdMovimiento DESC;"
```

## 17. Opciones generales de sqlcmd

| Opción             | Función                                                 |
| ------------------ | ------------------------------------------------------- |
| `-S "localhost"`   | Selecciona el servidor SQL Server.                      |
| `-E`               | Usa autenticación de Windows.                           |
| `-d "SGMF"`        | Selecciona la base de datos.                            |
| `-Q "SQL"`         | Ejecuta una consulta y termina.                         |
| `-i "archivo.sql"` | Ejecuta un archivo SQL.                                 |
| `-b`               | Devuelve un código de salida de error ante errores SQL. |

## 18. Flujo habitual de actualización

Cuando se modifique el modelo de la base de datos:

1. Compilar el proyecto SQL.
2. Comprobar que se generó el DACPAC.
3. Generar y revisar el informe de publicación.
4. Publicar el DACPAC cuando los cambios sean correctos.
5. Ejecutar los datos iniciales si corresponde.
6. Verificar tablas, restricciones, índices y procedimientos.
7. Ejecutar las pruebas de base de datos.

**Nota:** la publicación del DACPAC no sustituye la ejecución del archivo de datos iniciales ni la de los datos de prueba. Son operaciones independientes.

## Ejecutar los Tests

Ejecuta el ejecutor que lanza las pruebas y recopila los resultados.

```powershell
.\Scripts\Run-DatabaseTests.ps1
```
