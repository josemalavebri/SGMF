import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MovimientoCreate } from '../../models/movimiento-create';
import { MovimientoFormComponent } from '../../components/movimiento-form/movimiento-form';

import { MovimientoFormService } from '../../services/movimiento-form.service';
import { MovimientoService } from '../../services/movimiento.service';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';

import { TipoIngresoService } from '../../../tipos-ingreso/services/tipo-ingreso.service';
import { CategoriaEgresoService } from '../../../categorias-egreso/services/categoria-egreso.service';

import { AsyncStateService } from '../../../../core/services/async-state.service';

import { TipoMovimiento } from '../../models/TipoMovimiento';
import { TipoIngreso } from '../../../tipos-ingreso/models/tipo-ingreso';
import { CategoriaEgreso } from '../../../categorias-egreso/models/categoria-egreso';

@Component({
  selector: 'app-movimiento-create-page',
  standalone: true,
  imports: [MovimientoFormComponent],
  templateUrl: './movimiento-create-page.html',
  styleUrl: './movimiento-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoCreatePage implements OnInit {
  private readonly formService = inject(MovimientoFormService);

  private readonly asyncState = inject(AsyncStateService);

  private readonly movimientoService = inject(MovimientoService);

  private readonly tipoMovimientoService = inject(TipoMovimientoService);

  private readonly tipoIngresoService = inject(TipoIngresoService);

  private readonly categoriaEgresoService = inject(CategoriaEgresoService);

  private readonly router = inject(Router);

  readonly form = this.formService.createForm();

  readonly tiposMovimientoState = this.asyncState.create<TipoMovimiento[]>();

  readonly tiposIngresoState = this.asyncState.create<TipoIngreso[]>();

  readonly categoriasEgresoState = this.asyncState.create<CategoriaEgreso[]>();

  readonly saveState = this.asyncState.create<unknown>();

  ngOnInit(): void {
    this.asyncState.execute(this.tiposMovimientoState, this.tipoMovimientoService.getAll());

    this.asyncState.execute(this.tiposIngresoState, this.tipoIngresoService.getAll());

    this.asyncState.execute(this.categoriasEgresoState, this.categoriaEgresoService.getAll());
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: MovimientoCreate = {
      idTipoMovimiento: this.form.controls.idTipoMovimiento.value!,

      idTipoIngreso: this.form.controls.idTipoIngreso.value,

      idCategoriaEgreso: this.form.controls.idCategoriaEgreso.value,

      monto: this.form.controls.monto.value!,

      descripcion: this.form.controls.descripcion.value,
    };

    this.asyncState.execute(this.saveState, this.movimientoService.create(request), () =>
      this.router.navigate(['/movimientos']),
    );
  }

  cancel(): void {
    this.router.navigate(['/movimientos']);
  }
}
