import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CategoriaEgreso } from '../../models/categoria-egreso';
import { CategoriaEgresoService } from '../../services/categoria-egreso.service';
import { CategoriaEgresoTable } from '../../components/categoria-egreso-table/categoria-egreso-table';

@Component({
  selector: 'app-categorias-egreso-page',
  imports: [AsyncPipe, RouterLink, CategoriaEgresoTable],
  templateUrl: './categorias-egreso-page.html',
  styleUrl: './categorias-egreso-page.scss',
})
export class CategoriasEgresoPage {
  private readonly categoriaEgresoService = inject(CategoriaEgresoService);
  private readonly router = inject(Router);

  readonly categorias$ = this.categoriaEgresoService.getAll();

  error = '';

  editar(categoria: CategoriaEgreso): void {
    void this.router.navigate(['/categorias-egreso', 'editar', categoria.idCategoriaEgreso]);
  }

  eliminar(categoria: CategoriaEgreso): void {
    const confirmar = window.confirm(
      `¿Deseas eliminar la categoría de egreso "${categoria.nombre}"?`,
    );

    if (!confirmar) {
      return;
    }

    this.error = '';

    this.categoriaEgresoService.delete(categoria.idCategoriaEgreso).subscribe({
      error: (error: Error) => {
        this.error = error.message || 'No se pudo eliminar la categoría de egreso.';
      },
    });
  }

  
}
