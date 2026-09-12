using SGMF.Domain.Entities;

namespace SGMF.Application.Interfaces.Repositories;

public interface ITipoIngresoRepository
{
    Task<IEnumerable<TipoIngreso>> GetAllAsync();

    Task<int> CreateAsync(TipoIngreso tipoIngreso);

    Task<bool> UpdateAsync(TipoIngreso tipoIngreso);

    Task<bool> DeleteAsync(int idTipoIngreso);
}