import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { CategoriaEgreso } from '../models/categoria-egreso';
import { CategoriaEgresoCreate } from '../models/categoria-egreso-create';
import { CategoriaEgresoUpdate } from '../models/categoria-egreso-update';

@Injectable({
  providedIn: 'root',
})
export class CategoriaEgresoService {
  private readonly categoriasIniciales: CategoriaEgreso[] = [
    { idCategoriaEgreso: 1, nombre: 'Alimentación', activo: true },
    { idCategoriaEgreso: 2, nombre: 'Transporte', activo: true },
    { idCategoriaEgreso: 3, nombre: 'Vivienda', activo: true },
    { idCategoriaEgreso: 4, nombre: 'Salud', activo: true },
    { idCategoriaEgreso: 5, nombre: 'Entretenimiento', activo: true },
  ];

  private readonly categoriasSubject = new BehaviorSubject<CategoriaEgreso[]>(
    this.categoriasIniciales,
  );

  private siguienteId = 6;

  getAll(): Observable<CategoriaEgreso[]> {
    return this.categoriasSubject.asObservable();
  }

  getById(id: number): Observable<CategoriaEgreso | undefined> {
    const categoria = this.categoriasSubject.value.find((item) => item.idCategoriaEgreso === id);

    return of(categoria);
  }

  create(data: CategoriaEgresoCreate): Observable<CategoriaEgreso> {
    const nombre = data.nombre.trim();

    if (!nombre) {
      return throwError(() => new Error('El nombre es obligatorio.'));
    }

    if (this.existeNombre(nombre)) {
      return throwError(() => new Error('Ya existe una categoría de egreso con ese nombre.'));
    }

    const nuevaCategoria: CategoriaEgreso = {
      idCategoriaEgreso: this.siguienteId++,
      nombre,
      activo: true,
    };

    this.categoriasSubject.next([...this.categoriasSubject.value, nuevaCategoria]);

    return of(nuevaCategoria);
  }

  update(id: number, data: CategoriaEgresoUpdate): Observable<CategoriaEgreso> {
    const nombre = data.nombre.trim();

    if (!nombre) {
      return throwError(() => new Error('El nombre es obligatorio.'));
    }

    const actual = this.categoriasSubject.value.find((item) => item.idCategoriaEgreso === id);

    if (!actual) {
      return throwError(() => new Error('La categoría de egreso no existe.'));
    }

    if (this.existeNombre(nombre, id)) {
      return throwError(() => new Error('Ya existe una categoría de egreso con ese nombre.'));
    }

    const categoriaActualizada: CategoriaEgreso = {
      ...actual,
      nombre,
    };

    this.categoriasSubject.next(
      this.categoriasSubject.value.map((item) =>
        item.idCategoriaEgreso === id ? categoriaActualizada : item,
      ),
    );

    return of(categoriaActualizada);
  }

  delete(id: number): Observable<void> {
    const existe = this.categoriasSubject.value.some((item) => item.idCategoriaEgreso === id);

    if (!existe) {
      return throwError(() => new Error('La categoría de egreso no existe.'));
    }

    this.categoriasSubject.next(
      this.categoriasSubject.value.filter((item) => item.idCategoriaEgreso !== id),
    );

    return of(undefined);
  }

  private existeNombre(nombre: string, excluirId?: number): boolean {
    const nombreNormalizado = nombre.toLocaleLowerCase();

    return this.categoriasSubject.value.some(
      (item) =>
        item.idCategoriaEgreso !== excluirId &&
        item.nombre.trim().toLocaleLowerCase() === nombreNormalizado,
    );
  }
}
