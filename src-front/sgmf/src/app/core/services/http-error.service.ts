import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  getMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    }

    switch (error.status) {
      case 0:
        return 'No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo nuevamente.';

      case 400:
        return 'Los datos enviados no son válidos. Revisa la información e inténtalo nuevamente.';

      case 401:
        return 'Tu sesión no es válida o ha expirado.';

      case 403:
        return 'No tienes permiso para realizar esta operación.';

      case 404:
        return 'No se encontró el recurso solicitado.';

      case 409:
        return 'La operación no se puede completar porque existe un conflicto con los datos actuales.';

      case 422:
        return 'No se pudo procesar la información enviada. Revisa los datos e inténtalo nuevamente.';

      case 429:
        return 'Se han realizado demasiadas solicitudes. Inténtalo más tarde.';

      default:
        if (error.status >= 500) {
          return 'Ocurrió un error en el servidor. Inténtalo nuevamente más tarde.';
        }

        return 'No se pudo completar la solicitud. Inténtalo nuevamente.';
    }
  }

  getStatus(error: unknown): number | null {
    return error instanceof HttpErrorResponse ? error.status : null;
  }
}
