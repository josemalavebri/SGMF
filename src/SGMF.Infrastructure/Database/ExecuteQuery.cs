using Microsoft.Data.SqlClient;
using System.Data;

namespace SGMF.Infrastructure.Database;

public class ExecuteQuery
{
    private readonly ConexionDB _conexionDB;

    public ExecuteQuery(ConexionDB conexionDB)
    {
        _conexionDB = conexionDB;
    }

    public async Task<int> ExecuteSPNonQueryAsync(
        string nombreSp,
        IEnumerable<SqlParameter>? parametros = null)
    {
        await using var conexion = _conexionDB.CrearConexion();

        await using var comando = new SqlCommand(nombreSp, conexion)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (parametros is not null)
        {
            comando.Parameters.AddRange(parametros.ToArray());
        }

        await conexion.OpenAsync();

        return await comando.ExecuteNonQueryAsync();
    }

    public async Task<object?> ExecuteSPScalarAsync(
        string nombreSp,
        IEnumerable<SqlParameter>? parametros = null)
    {
        await using var conexion = _conexionDB.CrearConexion();

        await using var comando = new SqlCommand(nombreSp, conexion)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (parametros is not null)
        {
            comando.Parameters.AddRange(parametros.ToArray());
        }

        await conexion.OpenAsync();

        return await comando.ExecuteScalarAsync();
    }

    public async Task<DataTable> ExecuteSPQueryAsync(
        string nombreSp,
        IEnumerable<SqlParameter>? parametros = null)
    {
        await using var conexion = _conexionDB.CrearConexion();

        await using var comando = new SqlCommand(nombreSp, conexion)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (parametros is not null)
        {
            comando.Parameters.AddRange(parametros.ToArray());
        }

        await conexion.OpenAsync();

        await using var reader = await comando.ExecuteReaderAsync();

        var tabla = new DataTable();
        tabla.Load(reader);

        return tabla;
    }
}