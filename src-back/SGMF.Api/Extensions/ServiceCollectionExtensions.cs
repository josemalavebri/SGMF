
using Microsoft.Extensions.DependencyInjection;

namespace SGMF.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services)
    {
        services.AddControllers();

        services.AddApiProblemDetails();

        return services;
    }
}
