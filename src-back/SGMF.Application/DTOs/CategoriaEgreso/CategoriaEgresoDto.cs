namespace SGMF.Application.DTOs.CategoriaEgreso;

public class CategoriaEgresoDto
{
    public int IdCategoriaEgreso { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public bool Activo { get; set; }
}