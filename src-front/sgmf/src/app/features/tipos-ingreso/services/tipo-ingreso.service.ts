import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../core/config/config';
import { TipoIngreso } from '../models/tipo-ingreso';
import { TipoIngresoCreate } from '../models/tipo-ingreso-create';
import { TipoIngresoUpdate } from '../models/tipo-ingreso-update';

@Injectable({
  providedIn: 'root',
})
export class TipoIngresoService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${API_CONFIG.baseUrl}/tipos-ingreso`;

  getAll(): Observable<TipoIngreso[]> {
    return this.http.get<TipoIngreso[]>(this.endpoint);
  }

  create(data: TipoIngresoCreate): Observable<unknown> {
    return this.http.post(this.endpoint, data);
  }

  update(id: number, data: TipoIngresoUpdate): Observable<unknown> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
