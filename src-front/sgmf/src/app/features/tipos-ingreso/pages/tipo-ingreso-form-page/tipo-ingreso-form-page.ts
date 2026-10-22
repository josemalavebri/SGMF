import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TipoIngresoForm } from '../../components/tipo-ingreso-form/tipo-ingreso-form';
import { TipoIngresoCreate } from '../../models/tipo-ingreso-create';
import { TipoIngresoService } from '../../services/tipo-ingreso.service';

@Component({
  selector: 'app-tipo-ingreso-form-page',
  imports: [RouterLink, TipoIngresoForm],
  templateUrl: './tipo-ingreso-form-page.html',
  styleUrl: './tipo-ingreso-form-page.scss',
})
export class TipoIngresoFormPage implements OnInit {
  private readonly tipoIngresoService = inject(TipoIngresoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  modoEdicion = false;
  idTipoIngreso: number | null = null;
  nombreInicial = '';

  cargando = false;
  guardando = false;

  errorCarga = '';
  error = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === null) {
      return;
    }

    this.modoEdicion = true;

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
      this.errorCarga = 'El identificador del tipo de ingreso no es válido.';
      return;
    }

    this.idTipoIngreso = id;
    this.cargando = true;

    this.tipoIngresoService.getById(id).subscribe({
      next: (tipo) => {
        if (!tipo) {
          this.errorCarga = 'No se encontró el tipo de ingreso solicitado.';
          this.cargando = false;
          return;
        }

        this.nombreInicial = tipo.nombre;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudo cargar el tipo de ingreso.';
        this.cargando = false;
      },
    });
  }

  guardar(data: TipoIngresoCreate): void {
    if (this.guardando || this.errorCarga) {
      return;
    }

    this.error = '';
    this.guardando = true;

    const operacion =
      this.modoEdicion && this.idTipoIngreso !== null
        ? this.tipoIngresoService.update(this.idTipoIngreso, data)
        : this.tipoIngresoService.create(data);

    operacion.subscribe({
      next: () => {
        void this.router.navigate(['/tipos-ingreso']);
      },
      error: (error: Error) => {
        this.error = error.message || 'No se pudo guardar el tipo de ingreso.';
        this.guardando = false;
      },
    });
  }

  cancelar(): void {
    void this.router.navigate(['/tipos-ingreso']);
  }
}
