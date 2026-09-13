namespace SGMF.Application.DTOs.Movimiento;

public class MovimientoCreateDto
{
    public int IdTipoMovimiento { get; set; }

    public int? IdTipoIngreso { get; set; }

    public int? IdCategoriaEgreso { get; set; }

    public decimal Monto { get; set; }

    public string Descripcion { get; set; } = string.Empty;
}