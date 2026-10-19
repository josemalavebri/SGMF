export interface Movimiento {
  idMovimiento: number;
  idTipoMovimiento: number;
  idTipoIngreso: number | null;
  idCategoriaEgreso: number | null;
  monto: number;
  descripcion: string;
  fecha: string;
}
