namespace SGMF.Domain.Entities;

public class CategoriaEgreso
{
    public int IdCategoriaEgreso { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public bool Activo { get; set; }
}