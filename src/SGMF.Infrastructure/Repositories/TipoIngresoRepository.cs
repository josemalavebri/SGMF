using Microsoft.Data.SqlClient;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Domain.Entities;
using SGMF.Infrastructure.Database;
using System.Data;

namespace SGMF.Infrastructure.Repositories;

public class TipoIngresoRepository : ITipoIngresoRepository
{
    private readonly ExecuteQuery _executeQuery;

    public TipoIngresoRepository(ExecuteQuery executeQuery)
    {
        _executeQuery = executeQuery;
    }

    public async Task<IEnumerable<TipoIngreso>> GetAllAsync()
    {
        var tabla = await _executeQuery.ExecuteSPQueryAsync(
            "usp_TipoIngreso_GetAll");

        return tabla.AsEnumerable()
            .Select(Mapear)
            .ToList();
    }

    public async Task<int> CreateAsync(TipoIngreso tipoIngreso)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@Nombre",
                SqlDbType.VarChar, 50)
            {
                Value = tipoIngreso.Nombre
            }
        };

        var resultado = await _executeQuery.ExecuteSPScalarAsync(
            "usp_TipoIngreso_Create",
            parametros);

        return Convert.ToInt32(resultado);
    }

    public async Task<bool> UpdateAsync(TipoIngreso tipoIngreso)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@IdTipoIngreso",
                SqlDbType.Int)
            {
                Value = tipoIngreso.IdTipoIngreso
            },

            new SqlParameter(
                "@Nombre",
                SqlDbType.VarChar, 50)
            {
                Value = tipoIngreso.Nombre
            }
        };

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_TipoIngreso_Update",
            parametros);

        return resultado > 0;
    }

    public async Task<bool> DeleteAsync(int idTipoIngreso)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@IdTipoIngreso",
                SqlDbType.Int)
            {
                Value = idTipoIngreso
            }
        };

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_TipoIngreso_Delete",
            parametros);

        return resultado > 0;
    }

    private static TipoIngreso Mapear(DataRow row)
    {
        return new TipoIngreso
        {
            IdTipoIngreso =
                Convert.ToInt32(row["IdTipoIngreso"]),

            Nombre =
                Convert.ToString(row["Nombre"])!,

            Activo =
                Convert.ToBoolean(row["Activo"])
        };
    }
}