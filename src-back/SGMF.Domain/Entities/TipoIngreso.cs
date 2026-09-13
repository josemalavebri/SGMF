namespace SGMF.Domain.Entities;

public class TipoIngreso
{
    public int IdTipoIngreso { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public bool Activo { get; set; }
}