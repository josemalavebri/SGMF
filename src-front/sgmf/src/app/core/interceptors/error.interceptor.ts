import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { HttpErrorService } from '../services/http-error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(HttpErrorService);

  return next(req).pipe(
    catchError((error) => {
      const message = errorService.getMessage(error);
      console.error(message);
      return throwError(() => error);
    }),
  );
};
