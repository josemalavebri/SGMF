using SGMF.Application.DTOs.Movimiento;
using SGMF.Application.Interfaces.Repositories;
using SGMF.Application.Interfaces.Services;
using SGMF.Domain.Entities;

namespace SGMF.Application.Services;

public class MovimientoService : IMovimientoService
{
    private readonly IMovimientoRepository _repository;

    public MovimientoService(IMovimientoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<MovimientoDto>> GetAllAsync()
    {
        var movimientos = await _repository.GetAllAsync();

        return movimientos.Select(MapearDto);
    }

    public async Task<MovimientoDto?> GetByIdAsync(int idMovimiento)
    {
        var movimiento =
            await _repository.GetByIdAsync(idMovimiento);

        return movimiento is null
            ? null
            : MapearDto(movimiento);
    }

    public async Task<int> CreateAsync(MovimientoCreateDto dto)
    {
        var movimiento = new Movimiento
        {
            IdTipoMovimiento = dto.IdTipoMovimiento,
            IdTipoIngreso = dto.IdTipoIngreso,
            IdCategoriaEgreso = dto.IdCategoriaEgreso,
            Monto = dto.Monto,
            Descripcion = dto.Descripcion
        };

        return await _repository.CreateAsync(movimiento);
    }

    public async Task<bool> UpdateAsync(
        int idMovimiento,
        MovimientoUpdateDto dto)
    {
        var movimiento = new Movimiento
        {
            IdMovimiento = idMovimiento,
            IdTipoMovimiento = dto.IdTipoMovimiento,
            IdTipoIngreso = dto.IdTipoIngreso,
            IdCategoriaEgreso = dto.IdCategoriaEgreso,
            Monto = dto.Monto,
            Descripcion = dto.Descripcion
        };

        return await _repository.UpdateAsync(movimiento);
    }

    public async Task<bool> DeleteAsync(int idMovimiento)
    {
        return await _repository.DeleteAsync(idMovimiento);
    }

    private static MovimientoDto MapearDto(
        Movimiento movimiento)
    {
        return new MovimientoDto
        {
            IdMovimiento = movimiento.IdMovimiento,
            IdTipoMovimiento = movimiento.IdTipoMovimiento,
            IdTipoIngreso = movimiento.IdTipoIngreso,
            IdCategoriaEgreso = movimiento.IdCategoriaEgreso,
            Monto = movimiento.Monto,
            Descripcion = movimiento.Descripcion,
            Fecha = movimiento.Fecha
        };
    }
}