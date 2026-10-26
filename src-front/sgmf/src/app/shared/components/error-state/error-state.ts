import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorState {
  readonly title = input('No se pudo completar la operación');
  readonly message = input('Ocurrió un error inesperado.');

  readonly actionLabel = input<string | null>(null);

  readonly action = output<void>();
}
