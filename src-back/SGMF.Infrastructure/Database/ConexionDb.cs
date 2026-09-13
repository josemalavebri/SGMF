using Microsoft.Data.SqlClient;

namespace SGMF.Infrastructure.Database;

public class ConexionDB
{
    private readonly string _connectionString;

    public ConexionDB(string connectionString)
    {
        _connectionString = connectionString;
    }

    public SqlConnection CrearConexion()
    {
        return new SqlConnection(_connectionString);
    }
}