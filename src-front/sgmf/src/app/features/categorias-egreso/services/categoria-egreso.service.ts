import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoriaEgreso } from '../models/categoria-egreso';
import { CategoriaEgresoCreate } from '../models/categoria-egreso-create';
import { CategoriaEgresoUpdate } from '../models/categoria-egreso-update';
import { API_CONFIG } from '../../../core/config/config';

@Injectable({
  providedIn: 'root',
})
export class CategoriaEgresoService {
  private readonly url = `${API_CONFIG.baseUrl}/categorias-egreso`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<CategoriaEgreso[]> {
    return this.http.get<CategoriaEgreso[]>(this.url);
  }

  create(data: CategoriaEgresoCreate): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.url, {
      nombre: data.nombre.trim(),
    });
  }

  update(id: number, data: CategoriaEgresoUpdate): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, {
      nombre: data.nombre.trim(),
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
