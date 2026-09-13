using SGMF.Application.DTOs.TipoMovimiento;

namespace SGMF.Application.Interfaces.Services;

public interface ITipoMovimientoService
{
    Task<IEnumerable<TipoMovimientoDto>> GetAllAsync();
}