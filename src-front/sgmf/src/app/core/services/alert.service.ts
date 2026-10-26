import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: SweetAlertIcon;
  confirmColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirm(options: ConfirmOptions): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: options.icon ?? 'warning',
      title: options.title,
      text: options.message,
      showCancelButton: true,
      confirmButtonText: options.confirmText ?? 'Confirmar',
      cancelButtonText: options.cancelText ?? 'Cancelar',
      confirmButtonColor: options.confirmColor ?? '#0d6efd',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
      focusCancel: true,
    });
  }

  success(title: string, message?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd',
    });
  }

  error(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd',
    });
  }

  warning(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#0d6efd',
    });
  }

  info(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd',
    });
  }
}
