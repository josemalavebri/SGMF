import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CategoriaEgreso } from '../../models/categoria-egreso';

@Component({
  selector: 'app-categoria-egreso-table',
  imports: [],
  templateUrl: './categoria-egreso-table.html',
  styleUrl: './categoria-egreso-table.scss',
})
export class CategoriaEgresoTable {
  @Input() categorias: CategoriaEgreso[] = [];

  @Output() editar = new EventEmitter<CategoriaEgreso>();
  @Output() eliminar = new EventEmitter<CategoriaEgreso>();
}
