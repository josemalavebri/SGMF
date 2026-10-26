import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  getMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    }

    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo nuevamente.';
    }

    switch (error.status) {
      case 400:
        return (
          this.getClientErrorMessage(error) ??
          'No se pudo procesar la solicitud. Revisa los datos e inténtalo nuevamente.'
        );

      case 401:
        return 'No tienes autorización para realizar esta operación.';

      case 403:
        return 'No tienes permiso para realizar esta operación.';

      case 404:
        return 'No se encontró la información solicitada.';

      case 409:
        return (
          this.getClientErrorMessage(error) ??
          'La operación entra en conflicto con los datos existentes.'
        );

      case 422:
        return 'Los datos enviados no cumplen los requisitos necesarios.';

      case 500:
      case 502:
      case 503:
      case 504:
        return 'El servidor no pudo completar la solicitud. Inténtalo más tarde.';

      default:
        return 'Ocurrió un error al procesar la solicitud. Inténtalo nuevamente.';
    }
  }

  private getClientErrorMessage(error: HttpErrorResponse): string | null {
    const body: unknown = error.error;

    if (typeof body !== 'object' || body === null) {
      return null;
    }

    const response = body as Record<string, unknown>;

    for (const key of ['detail', 'message', 'title']) {
      const value = response[key];

      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }

    return null;
  }
}
