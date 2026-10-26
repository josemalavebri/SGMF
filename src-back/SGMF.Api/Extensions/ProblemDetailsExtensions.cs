
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SGMF.Api.Extensions;

public static class ProblemDetailsExtensions
{
    public static IServiceCollection AddApiProblemDetails(
        this IServiceCollection services)
    {
        services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions["traceId"] =
                    context.HttpContext.TraceIdentifier;
            };
        });

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var problem = new ValidationProblemDetails(
                    context.ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Uno o más errores de validación ocurrieron."
                };

                problem.Extensions["traceId"] =
                    context.HttpContext.TraceIdentifier;

                return new BadRequestObjectResult(problem);
            };
        });

        return services;
    }
}
