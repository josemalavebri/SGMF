using SGMF.Application.DTOs.TipoIngreso;

namespace SGMF.Application.Interfaces.Services;

public interface ITipoIngresoService
{
    Task<IEnumerable<TipoIngresoDto>> GetAllAsync();

    Task<int> CreateAsync(TipoIngresoCreateDto dto);

    Task<bool> UpdateAsync(
        int idTipoIngreso,
        TipoIngresoUpdateDto dto);

    Task<bool> DeleteAsync(int idTipoIngreso);
}