import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom, finalize } from 'rxjs';

import { HttpErrorService } from '../../../core/services/http-error.service';
import { Movimiento } from '../models/movimiento';
import { MovimientoCreate } from '../models/movimiento-create';
import { MovimientoUpdate } from '../models/movimiento-update';
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

  private readonly _selectedMovimiento = signal<Movimiento | null>(null);
  private readonly _loadingSelected = signal(false);
  private readonly _selectedError = signal<string | null>(null);

  private readonly _saving = signal(false);
  private readonly _saveError = signal<string | null>(null);

  private readonly _deleting = signal(false);
  private readonly _deleteError = signal<string | null>(null);

  readonly movimientos = this._movimientos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly selectedMovimiento = this._selectedMovimiento.asReadonly();
  readonly loadingSelected = this._loadingSelected.asReadonly();
  readonly selectedError = this._selectedError.asReadonly();

  readonly saving = this._saving.asReadonly();
  readonly saveError = this._saveError.asReadonly();

  readonly deleting = this._deleting.asReadonly();
  readonly deleteError = this._deleteError.asReadonly();

  load(): void {
    if (this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.movimientoService
      .getAll()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (movimientos) => {
          this._movimientos.set(movimientos);
        },
        error: (error: unknown) => {
          this._error.set(this.httpErrorService.getMessage(error));
        },
      });
  }

  async loadById(id: number): Promise<Movimiento> {
    this._loadingSelected.set(true);
    this._selectedError.set(null);
    this._selectedMovimiento.set(null);

    try {
      const movimiento = await firstValueFrom(this.movimientoService.getById(id));

      this._selectedMovimiento.set(movimiento);

      return movimiento;
    } catch (error: unknown) {
      this._selectedError.set(this.httpErrorService.getMessage(error));
      throw error;
    } finally {
      this._loadingSelected.set(false);
    }
  }

  async create(data: MovimientoCreate): Promise<void> {
    if (this._saving()) {
      return;
    }

    this._saving.set(true);
    this._saveError.set(null);

    try {
      await firstValueFrom(this.movimientoService.create(data));
    } catch (error: unknown) {
      this._saveError.set(this.httpErrorService.getMessage(error));
      throw error;
    } finally {
      this._saving.set(false);
    }
  }

  async update(id: number, data: MovimientoUpdate): Promise<void> {
    if (this._saving()) {
      return;
    }

    this._saving.set(true);
    this._saveError.set(null);

    try {
      await firstValueFrom(this.movimientoService.update(id, data));

      this._selectedMovimiento.update((movimiento) => {
        if (!movimiento || movimiento.idMovimiento !== id) {
          return movimiento;
        }

        return { ...movimiento, ...data };
      });

      this._movimientos.update((movimientos) =>
        movimientos.map((movimiento) =>
          movimiento.idMovimiento === id ? { ...movimiento, ...data } : movimiento,
        ),
      );
    } catch (error: unknown) {
      this._saveError.set(this.httpErrorService.getMessage(error));
      throw error;
    } finally {
      this._saving.set(false);
    }
  }

  async delete(id: number): Promise<void> {
    if (this._deleting()) {
      return;
    }

    this._deleting.set(true);
    this._deleteError.set(null);

    try {
      await firstValueFrom(this.movimientoService.delete(id));

      this._movimientos.update((movimientos) =>
        movimientos.filter((movimiento) => movimiento.idMovimiento !== id),
      );

      if (this._selectedMovimiento()?.idMovimiento === id) {
        this._selectedMovimiento.set(null);
      }
    } catch (error: unknown) {
      this._deleteError.set(this.httpErrorService.getMessage(error));
      throw error;
    } finally {
      this._deleting.set(false);
    }
  }

  clearLoadError(): void {
    this._error.set(null);
  }

  clearSelectedError(): void {
    this._selectedError.set(null);
  }

  clearSaveError(): void {
    this._saveError.set(null);
  }

  clearDeleteError(): void {
    this._deleteError.set(null);
  }

  clearSelected(): void {
    this._selectedMovimiento.set(null);
    this._selectedError.set(null);
  }

  clear(): void {
    this._movimientos.set([]);
    this._error.set(null);
    this.clearSelected();
    this.clearSaveError();
    this.clearDeleteError();
  }
}
