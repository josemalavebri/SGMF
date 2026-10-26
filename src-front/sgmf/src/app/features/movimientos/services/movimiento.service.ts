import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../core/config/config';
import { Movimiento } from '../models/movimiento';
import { MovimientoCreate } from '../models/movimiento-create';
import { MovimientoUpdate } from '../models/movimiento-update';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${API_CONFIG.baseUrl}/movimientos`;

  getAll(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.endpoint);
  }

  getById(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.endpoint}/${id}`);
  }

  create(data: MovimientoCreate): Observable<unknown> {
    return this.http.post<unknown>(this.endpoint, data);
  }

  update(id: number, data: MovimientoUpdate): Observable<unknown> {
    return this.http.put<unknown>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
