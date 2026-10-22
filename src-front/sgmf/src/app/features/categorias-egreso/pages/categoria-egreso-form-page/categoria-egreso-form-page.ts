import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CategoriaEgresoForm } from '../../components/categoria-egreso-form/categoria-egreso-form';
import { CategoriaEgresoCreate } from '../../models/categoria-egreso-create';
import { CategoriaEgresoService } from '../../services/categoria-egreso.service';

@Component({
  selector: 'app-categoria-egreso-form-page',
  imports: [RouterLink, CategoriaEgresoForm],
  templateUrl: './categoria-egreso-form-page.html',
  styleUrl: './categoria-egreso-form-page.scss',
})
export class CategoriaEgresoFormPage implements OnInit {
  private readonly categoriaEgresoService = inject(CategoriaEgresoService);
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

    this.categoriaEgresoService.getById(id).subscribe({
      next: (categoria) => {
        if (!categoria) {
          this.errorCarga = 'No se encontró la categoría solicitada.';
          this.cargando = false;
          return;
        }

        this.nombreInicial = categoria.nombre;
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudo cargar la categoría de egreso.';
        this.cargando = false;
      },
    });
  }

  guardar(data: CategoriaEgresoCreate): void {
    if (this.guardando || this.errorCarga) {
      return;
    }

    this.error = '';
    this.guardando = true;

    const operacion =
      this.modoEdicion && this.idCategoriaEgreso !== null
        ? this.categoriaEgresoService.update(this.idCategoriaEgreso, data)
        : this.categoriaEgresoService.create(data);

    operacion.subscribe({
      next: () => {
        void this.router.navigate(['/categorias-egreso']);
      },
      error: (error: Error) => {
        this.error = error.message || 'No se pudo guardar la categoría de egreso.';
        this.guardando = false;
      },
    });
  }

  cancelar(): void {
    void this.router.navigate(['/categorias-egreso']);
  }
}
