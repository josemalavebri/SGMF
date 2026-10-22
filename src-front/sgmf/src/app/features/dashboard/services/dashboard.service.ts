import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardMovimiento {
  id: number;
  descripcion: string;
  tipo: 'Ingreso' | 'Egreso';
  monto: number;
  fecha: string;
  categoria: string;
}

export interface DashboardResumen {
  balance: number;
  ingresosMes: number;
  egresosMes: number;
  cantidadMovimientosMes: number;
  movimientosRecientes: DashboardMovimiento[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly movimientos: DashboardMovimiento[] = [
    {
      id: 1,
      descripcion: 'Salario',
      tipo: 'Ingreso',
      monto: 1500,
      fecha: '2026-10-20',
      categoria: 'Salario',
    },
    {
      id: 2,
      descripcion: 'Compra de alimentos',
      tipo: 'Egreso',
      monto: 45,
      fecha: '2026-10-19',
      categoria: 'Alimentación',
    },
    {
      id: 3,
      descripcion: 'Transporte',
      tipo: 'Egreso',
      monto: 12,
      fecha: '2026-10-18',
      categoria: 'Transporte',
    },
    {
      id: 4,
      descripcion: 'Trabajo freelance',
      tipo: 'Ingreso',
      monto: 500,
      fecha: '2026-10-10',
      categoria: 'Freelance',
    },
    {
      id: 5,
      descripcion: 'Pago de alquiler',
      tipo: 'Egreso',
      monto: 300,
      fecha: '2026-10-05',
      categoria: 'Vivienda',
    },
    {
      id: 6,
      descripcion: 'Compra de alimentos',
      tipo: 'Egreso',
      monto: 65,
      fecha: '2026-09-25',
      categoria: 'Alimentación',
    },
  ];

  getResumen(): Observable<DashboardResumen> {
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    const mesActual = ahora.getMonth();

    const movimientosMes = this.movimientos.filter((movimiento) => {
      const fecha = new Date(`${movimiento.fecha}T12:00:00`);

      return fecha.getFullYear() === anioActual && fecha.getMonth() === mesActual;
    });

    const ingresosMes = movimientosMes
      .filter((movimiento) => movimiento.tipo === 'Ingreso')
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const egresosMes = movimientosMes
      .filter((movimiento) => movimiento.tipo === 'Egreso')
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const ingresosTotales = this.movimientos
      .filter((movimiento) => movimiento.tipo === 'Ingreso')
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const egresosTotales = this.movimientos
      .filter((movimiento) => movimiento.tipo === 'Egreso')
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    const movimientosRecientes = [...this.movimientos]
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
      .slice(0, 5);

    return of({
      balance: ingresosTotales - egresosTotales,
      ingresosMes,
      egresosMes,
      cantidadMovimientosMes: movimientosMes.length,
      movimientosRecientes,
    });
  }
}
