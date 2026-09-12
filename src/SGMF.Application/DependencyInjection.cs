using Microsoft.Extensions.DependencyInjection;
using SGMF.Application.Interfaces.Services;
using SGMF.Application.Services;

namespace SGMF.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<IMovimientoService, MovimientoService>();
        services.AddScoped<ITipoMovimientoService, TipoMovimientoService>();
        services.AddScoped<ITipoIngresoService, TipoIngresoService>();
        services.AddScoped<ICategoriaEgresoService, CategoriaEgresoService>();

        return services;
    }
}