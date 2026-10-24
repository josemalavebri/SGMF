import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriaEgresoForm } from '../../components/categoria-egreso-form/categoria-egreso-form';
import { CategoriaEgresoCreate } from '../../models/categoria-egreso-create';
import { CategoriaEgresoService } from '../../services/categoria-egreso.service';
import { HttpErrorService } from '../../../../core/services/http-error.service';

@Component({
  selector: 'app-categoria-egreso-form-page',
  imports: [RouterLink, CategoriaEgresoForm],
  templateUrl: './categoria-egreso-form-page.html',
  styleUrl: './categoria-egreso-form-page.scss',
})
export class CategoriaEgresoFormPage implements OnInit {
  private readonly categoriaEgresoService = inject(CategoriaEgresoService);
  private readonly httpErrorService = inject(HttpErrorService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  modoEdicion = false;
  idCategoriaEgreso: number | null = null;
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
      this.errorCarga = 'El identificador de la categoría no es válido.';
      return;
    }

    this.idCategoriaEgreso = id;
    this.cargando = true;

    this.categoriaEgresoService.getAll().subscribe({
      next: (categorias) => {
        const categoria = categorias.find((item) => item.idCategoriaEgreso === id);

        if (!categoria) {
          this.errorCarga = 'No se encontró la categoría solicitada.';
          this.cargando = false;
          return;
        }

        this.nombreInicial = categoria.nombre;
        this.cargando = false;
      },
      error: (error: unknown) => {
        this.errorCarga = this.httpErrorService.getMessage(error);
        this.cargando = false;
      },
    });
  }

  guardar(data: CategoriaEgresoCreate): void {
    if (this.guardando || this.cargando || this.errorCarga) {
      return;
    }

    if (this.modoEdicion && this.idCategoriaEgreso === null) {
      this.error = 'No se pudo identificar la categoría que deseas editar.';
      return;
    }

    this.error = '';
    this.guardando = true;

    const finalizar = (): void => {
      void this.router.navigate(['/categorias-egreso']);
    };

    const manejarError = (error: unknown): void => {
      this.error = this.httpErrorService.getMessage(error);
      this.guardando = false;
    };

    if (this.modoEdicion) {
      this.categoriaEgresoService.update(this.idCategoriaEgreso!, data).subscribe({
        next: finalizar,
        error: manejarError,
      });

      return;
    }

    this.categoriaEgresoService.create(data).subscribe({
      next: finalizar,
      error: manejarError,
    });
  }
  cancelar(): void {
    void this.router.navigate(['/categorias-egreso']);
  }
}
