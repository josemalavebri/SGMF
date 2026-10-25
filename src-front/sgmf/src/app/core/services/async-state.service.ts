import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncState } from '../models/async-state.model';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class AsyncStateService {
  private readonly httpErrorService = inject(HttpErrorService);

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

      error: (error: unknown) => {
        state.set({
          status: 'error',
          data: null,
          error: this.httpErrorService.getMessage(error),
        });
      },
    });
  }
}
