export interface MovimientoUpdate {
  idTipoMovimiento: number;
  idTipoIngreso: number | null;
  idCategoriaEgreso: number | null;
  monto: number;
  descripcion: string;
}
