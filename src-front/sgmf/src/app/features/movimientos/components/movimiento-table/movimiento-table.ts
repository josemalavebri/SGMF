import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Movimiento } from '../../models/movimiento';

@Component({
  selector: 'app-movimiento-table',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './movimiento-table.html',
  styleUrl: './movimiento-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovimientoTableComponent {
  readonly movimientos = input<Movimiento[]>([]);

  readonly edit = output<number>();

  readonly delete = output<number>();

  onEdit(id: number): void {
    this.edit.emit(id);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
