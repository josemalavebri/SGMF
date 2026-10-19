import { Routes } from '@angular/router';

export const CATEGORIAS_EGRESO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categorias-egreso-page/categorias-egreso-page').then(
        (m) => m.CategoriasEgresoPage,
      ),
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./pages/categoria-egreso-form-page/categoria-egreso-form-page').then(
        (m) => m.CategoriaEgresoFormPage,
      ),
  },
];
