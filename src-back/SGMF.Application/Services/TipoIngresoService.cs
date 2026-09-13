using SGMF.Application.DTOs.TipoIngreso;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Application.Interfaces.Services;
using SGMF.Domain.Entities;

namespace SGMF.Application.Services;

public class TipoIngresoService : ITipoIngresoService
{
    private readonly ITipoIngresoRepository _repository;

    public TipoIngresoService(
        ITipoIngresoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TipoIngresoDto>> GetAllAsync()
    {
        var tipos = await _repository.GetAllAsync();

        return tipos.Select(MapearDto);
    }

    public async Task<int> CreateAsync(
        TipoIngresoCreateDto dto)
    {
        var tipo = new TipoIngreso
        {
            Nombre = dto.Nombre
        };

        return await _repository.CreateAsync(tipo);
    }

    public async Task<bool> UpdateAsync(
        int idTipoIngreso,
        TipoIngresoUpdateDto dto)
    {
        var tipo = new TipoIngreso
        {
            IdTipoIngreso = idTipoIngreso,
            Nombre = dto.Nombre
        };

        return await _repository.UpdateAsync(tipo);
    }

    public async Task<bool> DeleteAsync(
        int idTipoIngreso)
    {
        return await _repository.DeleteAsync(idTipoIngreso);
    }

    private static TipoIngresoDto MapearDto(
        TipoIngreso tipo)
    {
        return new TipoIngresoDto
        {
            IdTipoIngreso = tipo.IdTipoIngreso,
            Nombre = tipo.Nombre,
            Activo = tipo.Activo
        };
    }
}