import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  @Input() userName = 'Usuario';
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  pageTitle = 'Dashboard';
  profileMenuOpen = false;

  constructor() {
    this.updatePageTitle(this.router.url);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.updatePageTitle((event as NavigationEnd).urlAfterRedirects);
        this.profileMenuOpen = false;
      });
  }

  get userInitials(): string {
    return (
      this.userName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase() || 'U'
    );
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  onLogout(): void {
    this.profileMenuOpen = false;
    this.logout.emit();
  }

  private updatePageTitle(url: string): void {
    const path = url.split(/[?#]/)[0];
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/movimientos': 'Movimientos',
      '/tipos-ingreso': 'Tipos de ingreso',
      '/categorias-egreso': 'Categorías de egreso',
      '/reportes': 'Reportes',
    };

    this.pageTitle =
      titles[path] ??
      Object.entries(titles).find(([route]) => path.startsWith(`${route}/`))?.[1] ??
      'Dashboard';
  }
}
