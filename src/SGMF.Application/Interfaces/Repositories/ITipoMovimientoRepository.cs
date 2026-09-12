using SGMF.Domain.Entities;

namespace SGMF.Application.Interfaces.Repositories;

public interface ITipoMovimientoRepository
{
    Task<IEnumerable<TipoMovimiento>> GetAllAsync();
}