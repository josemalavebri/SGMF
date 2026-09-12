using Microsoft.Data.SqlClient;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Domain.Entities;
using SGMF.Infrastructure.Database;
using System.Data;

namespace SGMF.Infrastructure.Repositories;

public class CategoriaEgresoRepository : ICategoriaEgresoRepository
{
    private readonly ExecuteQuery _executeQuery;

    public CategoriaEgresoRepository(ExecuteQuery executeQuery)
    {
        _executeQuery = executeQuery;
    }

    public async Task<IEnumerable<CategoriaEgreso>> GetAllAsync()
    {
        var tabla = await _executeQuery.ExecuteSPQueryAsync(
            "usp_CategoriaEgreso_GetAll");

        return tabla.AsEnumerable()
            .Select(Mapear)
            .ToList();
    }

    public async Task<int> CreateAsync(CategoriaEgreso categoria)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@Nombre",
                SqlDbType.VarChar, 50)
            {
                Value = categoria.Nombre
            }
        };

        var resultado = await _executeQuery.ExecuteSPScalarAsync(
            "usp_CategoriaEgreso_Create",
            parametros);

        return Convert.ToInt32(resultado);
    }

    public async Task<bool> UpdateAsync(CategoriaEgreso categoria)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@IdCategoriaEgreso",
                SqlDbType.Int)
            {
                Value = categoria.IdCategoriaEgreso
            },

            new SqlParameter(
                "@Nombre",
                SqlDbType.VarChar, 50)
            {
                Value = categoria.Nombre
            }
        };

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_CategoriaEgreso_Update",
            parametros);

        return resultado > 0;
    }

    public async Task<bool> DeleteAsync(int idCategoriaEgreso)
    {
        var parametros = new[]
        {
            new SqlParameter(
                "@IdCategoriaEgreso",
                SqlDbType.Int)
            {
                Value = idCategoriaEgreso
            }
        };

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_CategoriaEgreso_Delete",
            parametros);

        return resultado > 0;
    }

    private static CategoriaEgreso Mapear(DataRow row)
    {
        return new CategoriaEgreso
        {
            IdCategoriaEgreso =
                Convert.ToInt32(row["IdCategoriaEgreso"]),

            Nombre =
                Convert.ToString(row["Nombre"])!,

            Activo =
                Convert.ToBoolean(row["Activo"])
        };
    }
}