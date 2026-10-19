import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TIPO_MOVIMIENTO } from '../../../core/constants/tipo-movimiento.constants';

@Injectable({
  providedIn: 'root',
})
export class MovimientoFormService {
  createForm(): MovimientoForm {
    const form = new FormGroup({
      idTipoMovimiento: new FormControl<number | null>(null, Validators.required),

      idTipoIngreso: new FormControl<number | null>(null),

      idCategoriaEgreso: new FormControl<number | null>(null),

      monto: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),

      descripcion: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
    });

    form.controls.idTipoMovimiento.valueChanges.subscribe((tipo) =>
      this.configureTypeFields(form, tipo),
    );

    return form;
  }

  private configureTypeFields(form: MovimientoForm, tipo: number | null): void {
    const tipoIngreso = form.controls.idTipoIngreso;

    const categoriaEgreso = form.controls.idCategoriaEgreso;

    tipoIngreso.clearValidators();
    categoriaEgreso.clearValidators();

    tipoIngreso.reset(null);
    categoriaEgreso.reset(null);

    if (tipo === TIPO_MOVIMIENTO.INGRESO) {
      tipoIngreso.addValidators(Validators.required);
    }

    if (tipo === TIPO_MOVIMIENTO.EGRESO) {
      categoriaEgreso.addValidators(Validators.required);
    }

    tipoIngreso.updateValueAndValidity();
    categoriaEgreso.updateValueAndValidity();
  }
}

export type MovimientoForm = FormGroup<{
  idTipoMovimiento: FormControl<number | null>;
  idTipoIngreso: FormControl<number | null>;
  idCategoriaEgreso: FormControl<number | null>;
  monto: FormControl<number | null>;
  descripcion: FormControl<string>;
}>;
