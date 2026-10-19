import { Routes } from '@angular/router';

export const REPORTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/reportes-page/reportes-page').then((m) => m.ReportesPage),
  },
];
