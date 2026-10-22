import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { TipoIngresoService } from '../../services/tipo-ingreso.service';
import { TipoIngresoTable } from '../../components/tipo-ingreso-table/tipo-ingreso-table';
import { TipoIngreso } from '../../models/tipo-ingreso';

@Component({
  selector: 'app-tipos-ingreso-page',
  imports: [AsyncPipe, RouterLink, TipoIngresoTable],
  templateUrl: './tipos-ingreso-page.html',
  styleUrl: './tipos-ingreso-page.scss',
})
export class TiposIngresoPage {
  private readonly tipoIngresoService = inject(TipoIngresoService);
  private readonly router = inject(Router);

  readonly tipos$ = this.tipoIngresoService.getAll();

  error = '';

  editar(tipo: TipoIngreso): void {
    void this.router.navigate(['/tipos-ingreso', 'editar', tipo.idTipoIngreso]);
  }

  eliminar(tipo: TipoIngreso): void {
    const confirmar = window.confirm(`¿Deseas eliminar el tipo de ingreso "${tipo.nombre}"?`);

    if (!confirmar) {
      return;
    }

    this.error = '';

    this.tipoIngresoService.delete(tipo.idTipoIngreso).subscribe({
      error: (error: Error) => {
        this.error = error.message || 'No se pudo eliminar el registro.';
      },
    });
  }
}
