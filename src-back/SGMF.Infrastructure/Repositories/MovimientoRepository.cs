using Microsoft.Data.SqlClient;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Domain.Entities;
using SGMF.Infrastructure.Database;
using System.Data;

namespace SGMF.Infrastructure.Repositories;

public class MovimientoRepository : IMovimientoRepository
{
    private readonly ExecuteQuery _executeQuery;

    public MovimientoRepository(ExecuteQuery executeQuery)
    {
        _executeQuery = executeQuery;
    }

    public async Task<IEnumerable<Movimiento>> GetAllAsync()
    {
        var tabla = await _executeQuery.ExecuteSPQueryAsync(
            "usp_Movimiento_GetAll");

        return tabla.AsEnumerable()
            .Select(MapearMovimiento)
            .ToList();
    }

    public async Task<Movimiento?> GetByIdAsync(int idMovimiento)
    {
        var parametros = new[]
        {
            new SqlParameter("@IdMovimiento", SqlDbType.Int)
            {
                Value = idMovimiento
            }
        };

        var tabla = await _executeQuery.ExecuteSPQueryAsync(
            "usp_Movimiento_GetById",
            parametros);

        return tabla.AsEnumerable()
            .Select(MapearMovimiento)
            .FirstOrDefault();
    }

    public async Task<int> CreateAsync(Movimiento movimiento)
    {
        var parametros = CrearParametros(movimiento);

        var resultado = await _executeQuery.ExecuteSPScalarAsync(
            "usp_Movimiento_Create",
            parametros);

        return Convert.ToInt32(resultado);
    }

    public async Task<bool> UpdateAsync(Movimiento movimiento)
    {
        var parametros = new List<SqlParameter>
        {
            new SqlParameter("@IdMovimiento", movimiento.IdMovimiento)
        };

        parametros.AddRange(CrearParametros(movimiento));

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_Movimiento_Update",
            parametros);

        return resultado > 0;
    }

    public async Task<bool> DeleteAsync(int idMovimiento)
    {
        var parametros = new[]
        {
            new SqlParameter("@IdMovimiento", idMovimiento)
        };

        var resultado = await _executeQuery.ExecuteSPNonQueryAsync(
            "usp_Movimiento_Delete",
            parametros);

        return resultado > 0;
    }

    private static SqlParameter[] CrearParametros(Movimiento movimiento)
    {
        return new[]
        {
            new SqlParameter(
                "@IdTipoMovimiento",
                SqlDbType.Int)
            {
                Value = movimiento.IdTipoMovimiento
            },

            new SqlParameter(
                "@IdTipoIngreso",
                SqlDbType.Int)
            {
                Value = movimiento.IdTipoIngreso.HasValue
                    ? movimiento.IdTipoIngreso.Value
                    : DBNull.Value
            },

            new SqlParameter(
                "@IdCategoriaEgreso",
                SqlDbType.Int)
            {
                Value = movimiento.IdCategoriaEgreso.HasValue
                    ? movimiento.IdCategoriaEgreso.Value
                    : DBNull.Value
            },

            new SqlParameter(
                "@Monto",
                SqlDbType.Decimal)
            {
                Precision = 12,
                Scale = 2,
                Value = movimiento.Monto
            },

            new SqlParameter(
                "@Descripcion",
                SqlDbType.VarChar, 200)
            {
                Value = movimiento.Descripcion
            }
        };
    }

    private static Movimiento MapearMovimiento(DataRow row)
    {
        return new Movimiento
        {
            IdMovimiento = Convert.ToInt32(row["IdMovimiento"]),

            IdTipoMovimiento =
                Convert.ToInt32(row["IdTipoMovimiento"]),

            IdTipoIngreso =
                row["IdTipoIngreso"] == DBNull.Value
                    ? null
                    : Convert.ToInt32(row["IdTipoIngreso"]),

            IdCategoriaEgreso =
                row["IdCategoriaEgreso"] == DBNull.Value
                    ? null
                    : Convert.ToInt32(row["IdCategoriaEgreso"]),

            Monto =
                Convert.ToDecimal(row["Monto"]),

            Descripcion =
                Convert.ToString(row["Descripcion"])!,

            Fecha =
                Convert.ToDateTime(row["Fecha"])
        };
    }
}