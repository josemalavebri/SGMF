import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly breadcrumbs = signal<BreadcrumbItem[]>([{ label: 'Inicio', url: '/dashboard' }]);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateBreadcrumbs());

    this.updateBreadcrumbs();
  }

  private updateBreadcrumbs(): void {
    const items: BreadcrumbItem[] = [{ label: 'Inicio', url: '/dashboard' }];

    const segments: string[] = [];
    let route = this.router.routerState.snapshot.root;

    while (true) {
      segments.push(...route.url.map((segment) => segment.path));

      const label = route.data['breadcrumb'];

      if (typeof label === 'string' && label.trim()) {
        const url = segments.length ? `/${segments.join('/')}` : '/dashboard';

        const previous = items[items.length - 1];

        if (previous.label !== label || previous.url !== url) {
          items.push({ label, url });
        }
      }

      const nextRoute = route.children.find((child) => child.outlet === 'primary');

      if (!nextRoute) {
        break;
      }

      route = nextRoute;
    }

    this.breadcrumbs.set(items);
  }
}
