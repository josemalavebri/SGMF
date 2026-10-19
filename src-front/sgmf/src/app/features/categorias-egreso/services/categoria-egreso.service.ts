import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../core/config/config';
import { CategoriaEgreso } from '../models/categoria-egreso';
import { CategoriaEgresoCreate } from '../models/categoria-egreso-create';
import { CategoriaEgresoUpdate } from '../models/categoria-egreso-update';

@Injectable({
  providedIn: 'root',
})
export class CategoriaEgresoService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${API_CONFIG.baseUrl}/categorias-egreso`;

  getAll(): Observable<CategoriaEgreso[]> {
    return this.http.get<CategoriaEgreso[]>(this.endpoint);
  }

  create(data: CategoriaEgresoCreate): Observable<unknown> {
    return this.http.post(this.endpoint, data);
  }

  update(id: number, data: CategoriaEgresoUpdate): Observable<unknown> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
