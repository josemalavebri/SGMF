import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncState } from '../models/async-state.model';

@Injectable({
  providedIn: 'root',
})
export class AsyncStateService {
  create<T>(): WritableSignal<AsyncState<T>> {
    return signal<AsyncState<T>>({
      status: 'idle',
      data: null,
      error: null,
    });
  }

  execute<T>(
    state: WritableSignal<AsyncState<T>>,
    request: Observable<T>,
    onSuccess?: (data: T) => void,
  ): void {
    state.set({
      status: 'loading',
      data: null,
      error: null,
    });

    request.subscribe({
      next: (data) => {
        state.set({
          status: 'success',
          data,
          error: null,
        });

        onSuccess?.(data);
      },

      error: (error) => {
        state.set({
          status: 'error',
          data: null,
          error:
            error instanceof Error ? error.message : 'Ocurrió un error al procesar la solicitud.',
        });
      },
    });
  }
}
