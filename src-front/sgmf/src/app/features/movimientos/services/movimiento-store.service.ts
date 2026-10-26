import { Injectable, inject, signal } from '@angular/core';

import { HttpErrorService } from '../../../core/services/http-error.service';
import { Movimiento } from '../models/movimiento';
import { MovimientoService } from './movimiento.service';

@Injectable({
  providedIn: 'root',
})
export class MovimientoStoreService {
  private readonly movimientoService = inject(MovimientoService);
  private readonly httpErrorService = inject(HttpErrorService);

  private readonly _movimientos = signal<Movimiento[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _deleteError = signal<string | null>(null);

  readonly movimientos = this._movimientos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly deleteError = this._deleteError.asReadonly();

  private readonly _deleting = signal(false);

  readonly deleting = this._deleting.asReadonly();

  load(): void {
    if (this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.movimientoService.getAll().subscribe({
      next: (movimientos) => {
        this._movimientos.set(movimientos);
        this._loading.set(false);
      },

      error: (error: unknown) => {
        this._error.set(this.httpErrorService.getMessage(error));
        this._loading.set(false);
      },
    });
  }

  delete(id: number): void {
    if (this._deleting()) {
      return;
    }

    this._deleting.set(true);
    this._deleteError.set(null);

    this.movimientoService.delete(id).subscribe({
      next: () => {
        this._movimientos.update((movimientos) =>
          movimientos.filter((movimiento) => movimiento.idMovimiento !== id),
        );

        this._deleting.set(false);
      },
      error: (error: unknown) => {
        this._deleteError.set(this.httpErrorService.getMessage(error));

        this._deleting.set(false);
      },
    });
  }

  clear(): void {
    this._movimientos.set([]);
    this._loading.set(false);
    this._error.set(null);
    this._deleteError.set(null);
  }

  clearDeleteError(): void {
    this._deleteError.set(null);
  }
}
