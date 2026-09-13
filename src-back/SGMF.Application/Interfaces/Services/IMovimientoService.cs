using SGMF.Application.DTOs.Movimiento;

namespace SGMF.Application.Interfaces.Services;

public interface IMovimientoService
{
    Task<IEnumerable<MovimientoDto>> GetAllAsync();

    Task<MovimientoDto?> GetByIdAsync(int idMovimiento);

    Task<int> CreateAsync(MovimientoCreateDto dto);

    Task<bool> UpdateAsync(int idMovimiento, MovimientoUpdateDto dto);

    Task<bool> DeleteAsync(int idMovimiento);
}