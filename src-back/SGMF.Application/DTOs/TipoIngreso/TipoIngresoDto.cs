namespace SGMF.Application.DTOs.TipoIngreso;

public class TipoIngresoDto
{
    public int IdTipoIngreso { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public bool Activo { get; set; }
}