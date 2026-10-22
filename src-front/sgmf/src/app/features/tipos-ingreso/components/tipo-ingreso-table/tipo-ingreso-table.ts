import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TipoIngreso } from '../../models/tipo-ingreso';

@Component({
  selector: 'app-tipo-ingreso-table',
  imports: [],
  templateUrl: './tipo-ingreso-table.html',
  styleUrl: './tipo-ingreso-table.scss',
})
export class TipoIngresoTable {
  @Input() tipos: TipoIngreso[] = [];

  @Output() editar = new EventEmitter<TipoIngreso>();
  @Output() eliminar = new EventEmitter<TipoIngreso>();
}
