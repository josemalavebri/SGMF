import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { TipoIngreso } from '../models/tipo-ingreso';
import { TipoIngresoCreate } from '../models/tipo-ingreso-create';
import { TipoIngresoUpdate } from '../models/tipo-ingreso-update';

@Injectable({
  providedIn: 'root',
})
export class TipoIngresoService {
  private readonly tiposIniciales: TipoIngreso[] = [
    { idTipoIngreso: 1, nombre: 'Salario', activo: true },
    { idTipoIngreso: 2, nombre: 'Freelance', activo: true },
    { idTipoIngreso: 3, nombre: 'Inversiones', activo: true },
    { idTipoIngreso: 4, nombre: 'Otros ingresos', activo: true },
  ];

  private readonly tiposSubject = new BehaviorSubject<TipoIngreso[]>(this.tiposIniciales);

  private siguienteId = 5;

  getAll(): Observable<TipoIngreso[]> {
    return this.tiposSubject.asObservable();
  }

  getById(id: number): Observable<TipoIngreso | undefined> {
    const tipo = this.tiposSubject.value.find((item) => item.idTipoIngreso === id);

    return of(tipo);
  }

  create(data: TipoIngresoCreate): Observable<TipoIngreso> {
    const nombre = data.nombre.trim();

    if (!nombre) {
      return throwError(() => new Error('El nombre es obligatorio.'));
    }

    if (this.existeNombre(nombre)) {
      return throwError(() => new Error('Ya existe un tipo de ingreso con ese nombre.'));
    }

    const nuevoTipo: TipoIngreso = {
      idTipoIngreso: this.siguienteId++,
      nombre,
      activo: true,
    };

    this.tiposSubject.next([...this.tiposSubject.value, nuevoTipo]);

    return of(nuevoTipo);
  }

  update(id: number, data: TipoIngresoUpdate): Observable<TipoIngreso> {
    const nombre = data.nombre.trim();

    if (!nombre) {
      return throwError(() => new Error('El nombre es obligatorio.'));
    }

    const actual = this.tiposSubject.value.find((item) => item.idTipoIngreso === id);

    if (!actual) {
      return throwError(() => new Error('El tipo de ingreso no existe.'));
    }

    if (this.existeNombre(nombre, id)) {
      return throwError(() => new Error('Ya existe un tipo de ingreso con ese nombre.'));
    }

    const actualizado: TipoIngreso = {
      ...actual,
      nombre,
    };

    this.tiposSubject.next(
      this.tiposSubject.value.map((item) => (item.idTipoIngreso === id ? actualizado : item)),
    );

    return of(actualizado);
  }

  delete(id: number): Observable<void> {
    const existe = this.tiposSubject.value.some((item) => item.idTipoIngreso === id);

    if (!existe) {
      return throwError(() => new Error('El tipo de ingreso no existe.'));
    }

    this.tiposSubject.next(this.tiposSubject.value.filter((item) => item.idTipoIngreso !== id));

    return of(undefined);
  }

  private existeNombre(nombre: string, excluirId?: number): boolean {
    const nombreNormalizado = nombre.toLocaleLowerCase();

    return this.tiposSubject.value.some(
      (item) =>
        item.idTipoIngreso !== excluirId &&
        item.nombre.trim().toLocaleLowerCase() === nombreNormalizado,
    );
  }
}
