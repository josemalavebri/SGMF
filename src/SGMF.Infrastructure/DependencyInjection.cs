using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Application.Interfaces.Services;
using SGMF.Application.Services;
using SGMF.Infrastructure.Database;
using SGMF.Infrastructure.Repositories;

namespace SGMF.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString =
            configuration.GetConnectionString("Sgmf");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "La cadena de conexión 'Sgmf' no está configurada.");
        }

        services.AddSingleton(
            new ConexionDB(connectionString));

        services.AddScoped<ExecuteQuery>();

        services.AddScoped<IMovimientoRepository, MovimientoRepository>();
        services.AddScoped<ITipoMovimientoRepository, TipoMovimientoRepository>();
        services.AddScoped<ITipoIngresoRepository, TipoIngresoRepository>();
        services.AddScoped<ICategoriaEgresoRepository, CategoriaEgresoRepository>();

        services.AddScoped<IMovimientoService, MovimientoService>();
        services.AddScoped<ITipoMovimientoService, TipoMovimientoService>();
        services.AddScoped<ITipoIngresoService, TipoIngresoService>();
        services.AddScoped<ICategoriaEgresoService, CategoriaEgresoService>();

        return services;
    }
}