import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  getMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Ocurrió un error inesperado.';
    }

    const detail = error.error?.detail;
    const message = error.error?.message;
    const title = error.error?.title;

    if (typeof detail === 'string' && detail.trim()) return detail;
    if (typeof message === 'string' && message.trim()) return message;
    if (typeof title === 'string' && title.trim()) return title;

    switch (error.status) {
      case 400:
        return 'La solicitud no es válida.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 409:
        return 'La operación entra en conflicto con los datos existentes.';
      case 0:
        return 'No fue posible conectarse con el servidor.';
      case 500:
        return 'Ocurrió un error interno en el servidor.';
      default:
        return 'Ocurrió un error al procesar la solicitud.';
    }
  }
}
