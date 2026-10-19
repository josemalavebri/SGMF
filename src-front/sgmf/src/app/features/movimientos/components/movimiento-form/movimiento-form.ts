import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MovimientoForm } from '../../services/movimiento-form.service';

import { TipoMovimiento } from '../../models/TipoMovimiento';
import { TipoIngreso } from '../../../tipos-ingreso/models/tipo-ingreso';
import { CategoriaEgreso } from '../../../categorias-egreso/models/categoria-egreso';

import { TIPO_MOVIMIENTO } from '../../../../core/constants/tipo-movimiento.constants';

@Component({
  selector: 'app-movimiento-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movimiento-form.html',
  styleUrl: './movimiento-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoFormComponent {
  readonly form = input.required<MovimientoForm>();

  readonly tiposMovimiento = input<TipoMovimiento[]>([]);

  readonly tiposIngreso = input<TipoIngreso[]>([]);

  readonly categoriasEgreso = input<CategoriaEgreso[]>([]);

  readonly submitted = input(false);

  readonly save = output<void>();

  readonly cancel = output<void>();

  readonly tipoMovimiento = TIPO_MOVIMIENTO;

  onSubmit(): void {
    this.form().markAllAsTouched();

    if (this.form().invalid || this.submitted()) {
      return;
    }

    this.save.emit();
  }

  onCancel(): void {
    if (this.submitted()) {
      return;
    }

    this.cancel.emit();
  }
}
