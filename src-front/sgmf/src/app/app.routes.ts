import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'movimientos',
    loadChildren: () =>
      import('./features/movimientos/movimientos.routes').then((m) => m.MOVIMIENTOS_ROUTES),
  },
  {
    path: 'tipos-ingreso',
    loadChildren: () =>
      import('./features/tipos-ingreso/tipos-ingreso.routes').then((m) => m.TIPOS_INGRESO_ROUTES),
  },
  {
    path: 'categorias-egreso',
    loadChildren: () =>
      import('./features/categorias-egreso/categorias-egreso.routes').then(
        (m) => m.CATEGORIAS_EGRESO_ROUTES,
      ),
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./features/reportes/reportes.routes').then((m) => m.REPORTES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
