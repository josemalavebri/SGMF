import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AsyncStateService } from '../../../../core/services/async-state.service';

import { LoadingPage } from '../../../../shared/components/loading-page/loading-page';
import { LoadingOperation } from '../../../../shared/components/loading-operation/loading-operation';
import { MovimientoFormComponent } from '../../components/movimiento-form/movimiento-form';
import { MovimientoCreate } from '../../models/movimiento-create';
import { TipoMovimiento } from '../../models/TipoMovimiento';
import { MovimientoFormService } from '../../services/movimiento-form.service';
import { MovimientoService } from '../../services/movimiento.service';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';
import { TipoIngresoService } from '../../../tipos-ingreso/services/tipo-ingreso.service';
import { CategoriaEgresoService } from '../../../categorias-egreso/services/categoria-egreso.service';
import { TipoIngreso } from '../../../tipos-ingreso/models/tipo-ingreso';
import { CategoriaEgreso } from '../../../categorias-egreso/models/categoria-egreso';



@Component({
  selector: 'app-movimiento-create-page',
  standalone: true,
  imports: [MovimientoFormComponent, LoadingPage, LoadingOperation],
  templateUrl: './movimiento-create-page.html',
  styleUrl: './movimiento-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoCreatePage implements OnInit {
  private readonly router = inject(Router);
  private readonly asyncState = inject(AsyncStateService);
  private readonly formService = inject(MovimientoFormService);
  private readonly movimientoService = inject(MovimientoService);
  private readonly tipoMovimientoService = inject(TipoMovimientoService);
  private readonly tipoIngresoService = inject(TipoIngresoService);
  private readonly categoriaEgresoService = inject(CategoriaEgresoService);

  readonly form = this.formService.createForm();

  readonly tiposMovimientoState = this.asyncState.create<TipoMovimiento[]>();

  readonly tiposIngresoState = this.asyncState.create<TipoIngreso[]>();

  readonly categoriasEgresoState = this.asyncState.create<CategoriaEgreso[]>();

  readonly saveState = this.asyncState.create<unknown>();

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
    this.loadCatalogs();
  }

  private loadCatalogs(): void {
    this.asyncState.execute(this.tiposMovimientoState, this.tipoMovimientoService.getAll());

    this.asyncState.execute(this.tiposIngresoState, this.tipoIngresoService.getAll());

    this.asyncState.execute(this.categoriasEgresoState, this.categoriaEgresoService.getAll());
  }

  retryCatalogs(): void {
    this.loadCatalogs();
  }

  save(): void {
    if (this.form.invalid || this.saveState().status === 'loading') {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const request: MovimientoCreate = {
      idTipoMovimiento: value.idTipoMovimiento!,
      idTipoIngreso: value.idTipoIngreso,
      idCategoriaEgreso: value.idCategoriaEgreso,
      monto: value.monto!,
      descripcion: value.descripcion.trim(),
    };

    this.asyncState.execute(this.saveState, this.movimientoService.create(request), () => {
      void this.router.navigate(['/movimientos']);
    });
  }

  cancel(): void {
    if (this.saveState().status === 'loading') {
      return;
    }

    void this.router.navigate(['/movimientos']);
  }
}
