
$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path $PSScriptRoot -Parent
$Server = 'localhost'
$Database = 'SGMF'

Set-Location $ProjectRoot

$Passed = 0
$Failed = 0

function Invoke-DatabaseTest {
    param(
        [string]$Name,
        [string[]]$Arguments,
        [string]$ExpectedText = '',
        [switch]$ExpectError
    )

    Write-Host "`nTEST: $Name" -ForegroundColor Cyan

    $Output = @(& sqlcmd @Arguments 2>&1)
    $ExitCode = $LASTEXITCODE
    $Text = $Output -join "`n"

    if ($ExpectError) {
        $Success = ($ExitCode -ne 0) -and
                   ($Text -match [regex]::Escape($ExpectedText))
    }
    else {
        $Success = ($ExitCode -eq 0) -and
                   (
                       [string]::IsNullOrWhiteSpace($ExpectedText) -or
                       $Text.Contains($ExpectedText)
                   )
    }

    if ($Success) {
        Write-Host 'PASS' -ForegroundColor Green
        $script:Passed++
    }
    else {
        Write-Host 'FAIL' -ForegroundColor Red
        Write-Host $Text
        $script:Failed++
    }
}

$Connection = @('-S', $Server, '-E', '-d', $Database, '-b')

# 1. Archivo de pruebas con transacción y ROLLBACK.
Invoke-DatabaseTest `
    -Name 'Inserción y reversión de movimientos de prueba' `
    -Arguments ($Connection + @(
        '-i', '.\Data\TestData\001_TestMovimientos.sql'
    )) `
    -ExpectedText '3 rows affected'

# 2. Crear un ingreso válido y revertir la transacción.
Invoke-DatabaseTest `
    -Name 'Crear movimiento válido' `
    -Arguments ($Connection + @(
        '-Q',
        "BEGIN TRANSACTION; EXEC dbo.usp_Movimiento_Create @IdTipoMovimiento = 1, @IdTipoIngreso = 1, @IdCategoriaEgreso = NULL, @Monto = 800.00, @Descripcion = 'Prueba automatizada'; ROLLBACK TRANSACTION;"
    )) `
    -ExpectedText 'IdMovimiento'

# 3. Verificar que se rechaza un monto igual a cero.
Invoke-DatabaseTest `
    -Name 'Rechazar monto cero' `
    -Arguments ($Connection + @(
        '-Q',
        "EXEC dbo.usp_Movimiento_Create @IdTipoMovimiento = 1, @IdTipoIngreso = 1, @IdCategoriaEgreso = NULL, @Monto = 0, @Descripcion = 'Prueba invalida';"
    )) `
    -ExpectedText 'El monto debe ser mayor que cero.' `
    -ExpectError

# Resumen.
Write-Host "`n========== RESULTADO ==========" -ForegroundColor Cyan
Write-Host "Correctas: $Passed" -ForegroundColor Green
Write-Host "Fallidas:  $Failed" -ForegroundColor Red

if ($Failed -gt 0) {
    exit 1
}

exit 0
