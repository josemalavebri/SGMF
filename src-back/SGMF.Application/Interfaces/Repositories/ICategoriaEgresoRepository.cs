using SGMF.Domain.Entities;

namespace SGMF.Application.Interfaces.Repositories;

public interface ICategoriaEgresoRepository
{
    Task<IEnumerable<CategoriaEgreso>> GetAllAsync();

    Task<int> CreateAsync(CategoriaEgreso categoria);

    Task<bool> UpdateAsync(CategoriaEgreso categoria);

    Task<bool> DeleteAsync(int idCategoriaEgreso);
}