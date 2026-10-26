import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly title = input('No hay datos disponibles');
  readonly message = input('Todavía no hay información para mostrar.');

  readonly actionLabel = input<string | null>(null);

  readonly action = output<void>();
}
