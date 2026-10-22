import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CategoriaEgresoCreate } from '../../models/categoria-egreso-create';

@Component({
  selector: 'app-categoria-egreso-form',
  imports: [ReactiveFormsModule],
  templateUrl: './categoria-egreso-form.html',
  styleUrl: './categoria-egreso-form.scss',
})
export class CategoriaEgresoForm {
  private readonly fb = inject(FormBuilder);

  @Input() error = '';
  @Input() guardando = false;

  @Output() guardar = new EventEmitter<CategoriaEgresoCreate>();
  @Output() cancelar = new EventEmitter<void>();

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
  });

  @Input() set nombreInicial(value: string) {
    this.form.controls.nombre.setValue(value ?? '');
  }

  enviar(): void {
    if (this.form.invalid || this.guardando) {
      this.form.markAllAsTouched();
      return;
    }

    const nombre = this.form.controls.nombre.value.trim();

    if (!nombre) {
      this.form.controls.nombre.setErrors({ required: true });
      this.form.controls.nombre.markAsTouched();
      return;
    }

    this.guardar.emit({ nombre });
  }
}
