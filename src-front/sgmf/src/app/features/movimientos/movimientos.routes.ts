import { Routes } from '@angular/router';

export const MOVIMIENTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movimientos-page/movimientos-page').then((m) => m.MovimientosPage),
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./pages/movimiento-create-page/movimiento-create-page').then(
        (m) => m.MovimientoCreatePage,
      ),
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./pages/movimiento-edit-page/movimiento-edit-page').then((m) => m.MovimientoEditPage),
  },
];
