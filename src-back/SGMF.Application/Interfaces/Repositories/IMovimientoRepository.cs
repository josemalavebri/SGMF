using SGMF.Domain.Entities;

namespace SGMF.Application.Interfaces.Repositories;

public interface IMovimientoRepository
{
    Task<IEnumerable<Movimiento>> GetAllAsync();

    Task<Movimiento?> GetByIdAsync(int idMovimiento);

    Task<int> CreateAsync(Movimiento movimiento);

    Task<bool> UpdateAsync(Movimiento movimiento);

    Task<bool> DeleteAsync(int idMovimiento);
}