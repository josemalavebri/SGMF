using Microsoft.AspNetCore.Mvc;
using SGMF.Application.Interfaces.Services;

namespace SGMF.Api.Controllers;

[ApiController]
[Route("api/tipos-movimiento")]
public class TipoMovimientoController : ControllerBase
{
    private readonly ITipoMovimientoService _service;

    public TipoMovimientoController(
        ITipoMovimientoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tipos = await _service.GetAllAsync();

        return Ok(tipos);
    }
}