import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MovimientoStoreService } from '../../services/movimiento-store.service';
import { MovimientoTableComponent } from '../../components/movimiento-table/movimiento-table';
import { LoadingData } from '../../../../shared/components/loading-data/loading-data';

@Component({
  selector: 'app-movimientos-page',
  imports: [MovimientoTableComponent, LoadingData],
  templateUrl: './movimientos-page.html',
  styleUrl: './movimientos-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientosPage implements OnInit {
  private readonly router = inject(Router);

  readonly store = inject(MovimientoStoreService);

  ngOnInit(): void {
    this.store.load();
  }

  create(): void {
    this.router.navigate(['/movimientos/crear']);
  }

  edit(id: number): void {
    this.router.navigate(['/movimientos/editar', id]);
  }

  delete(id: number): void {
    // Posteriormente conectaremos confirmación + DELETE.
  }
}
