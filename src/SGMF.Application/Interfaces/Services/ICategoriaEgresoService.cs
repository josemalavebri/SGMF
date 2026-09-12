using SGMF.Application.DTOs.CategoriaEgreso;

namespace SGMF.Application.Interfaces.Services;

public interface ICategoriaEgresoService
{
    Task<IEnumerable<CategoriaEgresoDto>> GetAllAsync();

    Task<int> CreateAsync(CategoriaEgresoCreateDto dto);

    Task<bool> UpdateAsync(
        int idCategoriaEgreso,
        CategoriaEgresoUpdateDto dto);

    Task<bool> DeleteAsync(int idCategoriaEgreso);
}