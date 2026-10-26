import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly title = input('Confirmar acción');
  readonly message = input('¿Deseas continuar?');
  readonly confirmText = input('Confirmar');
  readonly cancelText = input('Cancelar');
  readonly loading = input(false);

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  onConfirm(): void {
    if (this.loading()) {
      return;
    }

    this.confirm.emit();
  }

  onCancel(): void {
    if (this.loading()) {
      return;
    }

    this.cancel.emit();
  }
}
