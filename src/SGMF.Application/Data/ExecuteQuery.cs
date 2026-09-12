using System.Data;

public class ExecuteQuery
{
    private readonly ConexionDB _conexion;

    public ExecuteQuery(ConexionDB conexion)
    {
        _conexion = conexion;
    }

    public async Task<bool> ExecuteSPNonQueryAsync(
        string nombreSp,
        IEnumerable<SqlParameter>? parametros = null)
    {
        using var connection = _conexion.CrearConexion();

        using var command = new SqlCommand(nombreSp, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (parametros != null)
            command.Parameters.AddRange(parametros.ToArray());

        await connection.OpenAsync();

        var resultado = await command.ExecuteNonQueryAsync();

        return resultado > 0;
    }

    public async Task<DataTable> ExecuteSPQueryAsync(
        string nombreSp,
        IEnumerable<SqlParameter>? parametros = null)
    {
        using var connection = _conexion.CrearConexion();

        using var command = new SqlCommand(nombreSp, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        if (parametros != null)
            command.Parameters.AddRange(parametros.ToArray());

        await connection.OpenAsync();

        using var reader = await command.ExecuteReaderAsync();

        var tabla = new DataTable();
        tabla.Load(reader);

        return tabla;
    }
}