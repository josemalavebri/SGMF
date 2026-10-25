import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-data',
  standalone: true,
  templateUrl: './loading-data.html',
  styleUrl: './loading-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingData {
  readonly message = input('Cargando datos...');
}
