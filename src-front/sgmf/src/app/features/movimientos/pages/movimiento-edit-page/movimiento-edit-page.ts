import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../../../core/services/alert.service';

import { LoadingPage } from '../../../../shared/components/loading-page/loading-page';
import { LoadingOperation } from '../../../../shared/components/loading-operation/loading-operation';
import { ErrorState } from '../../../../shared/components/error-state/error-state';

import { MovimientoFormComponent } from '../../components/movimiento-form/movimiento-form';
import { MovimientoFormService } from '../../services/movimiento-form.service';
import { MovimientoStoreService } from '../../services/movimiento-store.service';

import { TipoMovimientoService } from '../../services/tipo-movimiento.service';
import { TipoIngresoService } from '../../../tipos-ingreso/services/tipo-ingreso.service';
import { CategoriaEgresoService } from '../../../categorias-egreso/services/categoria-egreso.service';

import { AsyncStateService } from '../../../../core/services/async-state.service';

import { TipoMovimiento } from '../../models/TipoMovimiento';
import { TipoIngreso } from '../../../tipos-ingreso/models/tipo-ingreso';
import { CategoriaEgreso } from '../../../categorias-egreso/models/categoria-egreso';
import { MovimientoUpdate } from '../../models/movimiento-update';

@Component({
  selector: 'app-movimiento-edit-page',
  standalone: true,
  imports: [MovimientoFormComponent, LoadingPage, LoadingOperation, ErrorState],
  templateUrl: './movimiento-edit-page.html',
  styleUrl: './movimiento-edit-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoEditPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly formService = inject(MovimientoFormService);
  private readonly asyncState = inject(AsyncStateService);

  readonly store = inject(MovimientoStoreService);

  private readonly tipoMovimientoService = inject(TipoMovimientoService);
  private readonly tipoIngresoService = inject(TipoIngresoService);
  private readonly categoriaEgresoService = inject(CategoriaEgresoService);

  readonly form = this.formService.createForm();

  readonly tiposMovimientoState = this.asyncState.create<TipoMovimiento[]>();
  readonly tiposIngresoState = this.asyncState.create<TipoIngreso[]>();
  readonly categoriasEgresoState = this.asyncState.create<CategoriaEgreso[]>();

  readonly isLoadingCatalogs = computed(
    () =>
      this.tiposMovimientoState().status === 'loading' ||
      this.tiposIngresoState().status === 'loading' ||
      this.categoriasEgresoState().status === 'loading',
  );

  readonly hasCatalogError = computed(
    () =>
      this.tiposMovimientoState().status === 'error' ||
      this.tiposIngresoState().status === 'error' ||
      this.categoriasEgresoState().status === 'error',
  );

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      void this.alertService
        .error('Movimiento no válido', 'El identificador del movimiento no es válido.')
        .then(() => this.router.navigate(['/movimientos']));

      return;
    }

    this.loadCatalogs();
    void this.loadMovimiento(id);
  }

  private loadCatalogs(): void {
    this.asyncState.execute(this.tiposMovimientoState, this.tipoMovimientoService.getAll());

    this.asyncState.execute(this.tiposIngresoState, this.tipoIngresoService.getAll());

    this.asyncState.execute(this.categoriasEgresoState, this.categoriaEgresoService.getAll());
  }

  retryCatalogs(): void {
    this.loadCatalogs();
  }

  async loadMovimiento(id: number): Promise<void> {
    try {
      const movimiento = await this.store.loadById(id);
      this.formService.populateForm(this.form, movimiento);
    } catch {
      await this.alertService.error(
        'No se pudo cargar el movimiento',
        this.store.selectedError() ?? 'Inténtalo nuevamente.',
      );

      await this.router.navigate(['/movimientos']);
    }
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.store.saving() || this.store.loadingSelected()) {
      this.form.markAllAsTouched();
      return;
    }

    const movimiento = this.store.selectedMovimiento();

    if (!movimiento) {
      return;
    }

    const value = this.form.getRawValue();

    const request: MovimientoUpdate = {
      idTipoMovimiento: value.idTipoMovimiento!,
      idTipoIngreso: value.idTipoIngreso,
      idCategoriaEgreso: value.idCategoriaEgreso,
      monto: value.monto!,
      descripcion: value.descripcion.trim(),
    };

    try {
      await this.store.update(movimiento.idMovimiento, request);

      await this.alertService.success(
        'Movimiento actualizado',
        'Los cambios se guardaron correctamente.',
      );

      await this.router.navigate(['/movimientos']);
    } catch {
      // El Store conserva el error en saveError.
    }
  }

  cancel(): void {
    if (this.store.saving()) {
      return;
    }

    void this.router.navigate(['/movimientos']);
  }
}
