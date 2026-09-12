/*
    SGMF
    Sistema de Gestión de Movimientos Financieros

    Script principal de instalación.
*/

:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\01_CreateDatabase.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\02_CreateTables.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\03_CreateConstraints.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\04_CreateIndexes.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\05_CreateViews.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\06_CreateFunctions.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\07_CreateStoredProcedures.sql"
:r "C:\Users\josem\Programacion\Proyectos Produccion\SGMF\Project\src\SGMF.Database\Scripts\08_SeedData.sql"


SELECT
    name,
    type_desc
FROM sys.objects
WHERE type IN ('P', 'V', 'FN', 'IF', 'TF')
ORDER BY type_desc, name;
