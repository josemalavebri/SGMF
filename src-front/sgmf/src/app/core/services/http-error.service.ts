import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  getMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'La solicitud no es válida.';

      case 404:
        return 'El recurso solicitado no fue encontrado.';

      case 500:
        return 'Ocurrió un error interno en el servidor.';

      case 0:
        return 'No fue posible conectarse con el servidor.';

      default:
        return 'Ocurrió un error al procesar la solicitud.';
    }
  }
}
