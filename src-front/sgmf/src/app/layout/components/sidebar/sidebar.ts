import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  @Input() collapsed = false;
  @Input() mobileOpen = false;

  readonly items: SidebarItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'bi-grid-1x2',
      exact: true,
    },
    {
      label: 'Movimientos',
      route: '/movimientos',
      icon: 'bi-arrow-left-right',
    },
    {
      label: 'Categorías de egreso',
      route: '/categorias-egreso',
      icon: 'bi-tags',
    },
    {
      label: 'Tipos de ingreso',
      route: '/tipos-ingreso',
      icon: 'bi-wallet2',
    },
    {
      label: 'Reportes',
      route: '/reportes',
      icon: 'bi-bar-chart-line',
    },
  ];
}
