using SGMF.Application.Interfaces.Repositories;
using SGMF.Domain.Entities;
using SGMF.Infrastructure.Database;
using System.Data;

namespace SGMF.Infrastructure.Repositories;

public class TipoMovimientoRepository : ITipoMovimientoRepository
{
    private readonly ExecuteQuery _executeQuery;

    public TipoMovimientoRepository(ExecuteQuery executeQuery)
    {
        _executeQuery = executeQuery;
    }

    public async Task<IEnumerable<TipoMovimiento>> GetAllAsync()
    {
        var tabla = await _executeQuery.ExecuteSPQueryAsync(
            "usp_TipoMovimiento_GetAll");

        return tabla.AsEnumerable()
            .Select(Mapear)
            .ToList();
    }

    private static TipoMovimiento Mapear(DataRow row)
    {
        return new TipoMovimiento
        {
            IdTipoMovimiento =
                Convert.ToInt32(row["IdTipoMovimiento"]),

            Nombre =
                Convert.ToString(row["Nombre"])!
        };
    }
}