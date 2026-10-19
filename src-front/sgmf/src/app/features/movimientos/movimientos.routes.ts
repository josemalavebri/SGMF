import { Routes } from '@angular/router';

export const MOVIMIENTOS_ROUTES: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Movimientos' },
    children: [
      {
        path: '',
        data: { breadcrumb: 'Listado' },
        loadComponent: () =>
          import('./pages/movimientos-page/movimientos-page').then((m) => m.MovimientosPage),
      },
      {
        path: 'crear',
        data: { breadcrumb: 'Nuevo movimiento' },
        loadComponent: () =>
          import('./pages/movimiento-create-page/movimiento-create-page').then(
            (m) => m.MovimientoCreatePage,
          ),
      },
      {
        path: 'editar/:id',
        data: { breadcrumb: 'Editar movimiento' },
        loadComponent: () =>
          import('./pages/movimiento-edit-page/movimiento-edit-page').then(
            (m) => m.MovimientoEditPage,
          ),
      },
    ],
  },
];
