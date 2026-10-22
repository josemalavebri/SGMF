import { Routes } from '@angular/router';

export const TIPOS_INGRESO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/tipos-ingreso-page/tipos-ingreso-page').then((m) => m.TiposIngresoPage),
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./pages/tipo-ingreso-form-page/tipo-ingreso-form-page').then(
        (m) => m.TipoIngresoFormPage,
      ),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./pages/tipo-ingreso-form-page/tipo-ingreso-form-page').then(
        (m) => m.TipoIngresoFormPage,
      ),
  },
];
