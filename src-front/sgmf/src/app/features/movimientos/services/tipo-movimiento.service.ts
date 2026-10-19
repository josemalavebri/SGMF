import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../core/config/config';
import { TipoMovimiento } from '../models/TipoMovimiento';

@Injectable({
  providedIn: 'root',
})
export class TipoMovimientoService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${API_CONFIG.baseUrl}/tipos-movimiento`;

  getAll(): Observable<TipoMovimiento[]> {
    return this.http.get<TipoMovimiento[]>(this.endpoint);
  }
}
