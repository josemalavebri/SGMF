import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovimientoCreatePage } from './features/movimientos/pages/movimiento-create-page/movimiento-create-page';

import { Loading } from './shared/components/loading/loading';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { MovimientosPage } from './features/movimientos/pages/movimientos-page/movimientos-page';

@Component({
  imports: [RouterOutlet, MovimientoCreatePage, Loading, DashboardPage, MovimientosPage],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('sgmf');
  isLoading = true;
}
