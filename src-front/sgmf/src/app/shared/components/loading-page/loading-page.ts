import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  imports: [],
  templateUrl: './loading-page.html',
  styleUrl: './loading-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPage {
  readonly message = input('Cargando página...');
}
