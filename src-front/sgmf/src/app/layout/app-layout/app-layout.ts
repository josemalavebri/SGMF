import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { Header } from '../components/header/header';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, Header, RouterOutlet, Breadcrumbs],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  sidebarCollapsed = false;
  mobileSidebarOpen = false;

  toggleSidebar(): void {
    if (window.matchMedia('(max-width: 767.98px)').matches) {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
      return;
    }

    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }
}
