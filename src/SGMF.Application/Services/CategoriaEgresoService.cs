using SGMF.Application.DTOs.CategoriaEgreso;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Application.Interfaces.Services;
using SGMF.Domain.Entities;

namespace SGMF.Application.Services;

public class CategoriaEgresoService : ICategoriaEgresoService
{
    private readonly ICategoriaEgresoRepository _repository;

    public CategoriaEgresoService(
        ICategoriaEgresoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CategoriaEgresoDto>> GetAllAsync()
    {
        var categorias = await _repository.GetAllAsync();

        return categorias.Select(MapearDto);
    }

    public async Task<int> CreateAsync(
        CategoriaEgresoCreateDto dto)
    {
        var categoria = new CategoriaEgreso
        {
            Nombre = dto.Nombre
        };

        return await _repository.CreateAsync(categoria);
    }

    public async Task<bool> UpdateAsync(
        int idCategoriaEgreso,
        CategoriaEgresoUpdateDto dto)
    {
        var categoria = new CategoriaEgreso
        {
            IdCategoriaEgreso = idCategoriaEgreso,
            Nombre = dto.Nombre
        };

        return await _repository.UpdateAsync(categoria);
    }

    public async Task<bool> DeleteAsync(
        int idCategoriaEgreso)
    {
        return await _repository.DeleteAsync(idCategoriaEgreso);
    }

    private static CategoriaEgresoDto MapearDto(
        CategoriaEgreso categoria)
    {
        return new CategoriaEgresoDto
        {
            IdCategoriaEgreso =
                categoria.IdCategoriaEgreso,

            Nombre =
                categoria.Nombre,

            Activo =
                categoria.Activo
        };
    }
}