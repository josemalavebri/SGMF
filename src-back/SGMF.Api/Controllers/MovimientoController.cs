using Microsoft.AspNetCore.Mvc;
using SGMF.Application.DTOs.Movimiento;
using SGMF.Application.Interfaces.Services;

namespace SGMF.Api.Controllers;

[ApiController]
[Route("api/movimientos")]
public class MovimientoController : ControllerBase
{
    private readonly IMovimientoService _service;

    public MovimientoController(
        IMovimientoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var movimientos = await _service.GetAllAsync();

        return Ok(movimientos);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var movimiento =
            await _service.GetByIdAsync(id);

        if (movimiento is null)
        {
            return NotFound();
        }

        return Ok(movimiento);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        MovimientoCreateDto dto)
    {
        var id = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id },
            new { id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        MovimientoUpdateDto dto)
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