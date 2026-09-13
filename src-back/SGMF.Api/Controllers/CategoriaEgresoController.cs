using Microsoft.AspNetCore.Mvc;
using SGMF.Application.DTOs.CategoriaEgreso;
using SGMF.Application.Interfaces.Services;

namespace SGMF.Api.Controllers;

[ApiController]
[Route("api/categorias-egreso")]
public class CategoriaEgresoController : ControllerBase
{
    private readonly ICategoriaEgresoService _service;

    public CategoriaEgresoController(
        ICategoriaEgresoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categorias =
            await _service.GetAllAsync();

        return Ok(categorias);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CategoriaEgresoCreateDto dto)
    {
        var id = await _service.CreateAsync(dto);

        return Created(
            $"/api/categorias-egreso/{id}",
            new { id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        CategoriaEgresoUpdateDto dto)
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