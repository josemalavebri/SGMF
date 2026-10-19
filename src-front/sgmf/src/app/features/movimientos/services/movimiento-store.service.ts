import { Injectable, inject, signal } from '@angular/core';

import { Movimiento } from '../models/movimiento';
import { MovimientoService } from './movimiento.service';

@Injectable({
  providedIn: 'root',
})
export class MovimientoStoreService {
  private readonly movimientoService = inject(MovimientoService);
  private readonly _movimientos = signal<Movimiento[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  readonly movimientos = this._movimientos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._loading.set(true);
    this._error.set(null);

    this.movimientoService.getAll().subscribe({
      next: (movimientos) => {
        this._movimientos.set(movimientos);
        this._loading.set(false);
      },

      error: () => {
        this._error.set('No fue posible cargar los movimientos.');

        this._loading.set(false);
      },
    });
  }

  delete(id: number): void {
    this.movimientoService.delete(id).subscribe({
      next: () => {
        this._movimientos.update((movimientos) =>
          movimientos.filter((movimiento) => movimiento.idMovimiento !== id),
        );
      },

      error: () => {
        this._error.set('No fue posible eliminar el movimiento.');
      },
    });
  }

  clear(): void {
    this._movimientos.set([]);
    this._error.set(null);
  }
}
