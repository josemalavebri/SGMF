using SGMF.Application.DTOs.TipoMovimiento;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Application.Interfaces.Services;

namespace SGMF.Application.Services;

public class TipoMovimientoService : ITipoMovimientoService
{
    private readonly ITipoMovimientoRepository _repository;

    public TipoMovimientoService(
        ITipoMovimientoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TipoMovimientoDto>> GetAllAsync()
    {
        var tipos = await _repository.GetAllAsync();

        return tipos.Select(tipo => new TipoMovimientoDto
        {
            IdTipoMovimiento = tipo.IdTipoMovimiento,
            Nombre = tipo.Nombre
        });
    }
}