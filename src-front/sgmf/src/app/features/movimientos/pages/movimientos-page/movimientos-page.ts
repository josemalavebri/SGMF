import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingData } from '../../../../shared/components/loading-data/loading-data';
import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

import { AlertService } from '../../../../core/services/alert.service';

import { MovimientoTableComponent } from '../../components/movimiento-table/movimiento-table';
import { MovimientoStoreService } from '../../services/movimiento-store.service';

@Component({
  selector: 'app-movimientos-page',
  standalone: true,
  imports: [MovimientoTableComponent, LoadingData, ErrorState, EmptyState],
  templateUrl: './movimientos-page.html',
  styleUrl: './movimientos-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientosPage implements OnInit {
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);

  readonly store = inject(MovimientoStoreService);

  ngOnInit(): void {
    this.store.load();
  }

  create(): void {
    void this.router.navigate(['/movimientos/crear']);
  }

  edit(id: number): void {
    void this.router.navigate(['/movimientos/editar', id]);
  }

  async delete(id: number): Promise<void> {
    const result = await this.alertService.confirm({
      title: '¿Eliminar movimiento?',
      message: 'Esta acción no se puede deshacer.',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      confirmColor: '#dc3545',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await this.store.delete(id);

      await this.alertService.success(
        'Movimiento eliminado',
        'El movimiento se eliminó correctamente.',
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'No se pudo eliminar el movimiento.';

      await this.alertService.error('Error al eliminar', message);
    }
  }

  retry(): void {
    this.store.load();
  }

  async showSuccess(title: string, message: string): Promise<void> {
    await this.alertService.success(title, message);
  }
}
