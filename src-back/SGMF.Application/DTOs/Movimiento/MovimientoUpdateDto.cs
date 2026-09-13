namespace SGMF.Application.DTOs.Movimiento;

public class MovimientoUpdateDto
{
    public int IdTipoMovimiento { get; set; }

    public int? IdTipoIngreso { get; set; }

    public int? IdCategoriaEgreso { get; set; }

    public decimal Monto { get; set; }

    public string Descripcion { get; set; } = string.Empty;
}