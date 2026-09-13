using Microsoft.AspNetCore.Mvc;
using SGMF.Application.DTOs.TipoIngreso;
using SGMF.Application.Interfaces.Services;

namespace SGMF.Api.Controllers;

[ApiController]
[Route("api/tipos-ingreso")]
public class TipoIngresoController : ControllerBase
{
    private readonly ITipoIngresoService _service;

    public TipoIngresoController(
        ITipoIngresoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tipos = await _service.GetAllAsync();

        return Ok(tipos);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        TipoIngresoCreateDto dto)
    {
        var id = await _service.CreateAsync(dto);

        return Created(
            $"/api/tipos-ingreso/{id}",
            new { id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        TipoIngresoUpdateDto dto)
    {
        var actualizado =
            await _service.UpdateAsync(id, dto);

        if (!actualizado)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var eliminado =
            await _service.DeleteAsync(id);

        if (!eliminado)
        {
            return NotFound();
        }

        return NoContent();
    }
}