import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-operation',
  standalone: true,
  imports: [],
  templateUrl: './loading-operation.html',
  styleUrl: './loading-operation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOperation {
  readonly message = input('Procesando operación...');
}
