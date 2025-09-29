import { Pipe, PipeTransform } from '@angular/core';
import { PaymentStatus } from '../models/payment-request.model';

const STATUS_CLASSES: Record<PaymentStatus, string> = {
  PROCESADA: 'bg-green-100 text-green-800',
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  CANCELADA: 'bg-gray-100 text-gray-800',
  RECHAZADA: 'bg-red-100 text-red-800',
  VENCIDA: 'bg-orange-100 text-orange-800',
};

const STATUS_TEXTS: Record<PaymentStatus, string> = {
  PROCESADA: 'Procesada',
  PENDIENTE: 'Pendiente',
  CANCELADA: 'Cancelada',
  RECHAZADA: 'Rechazada',
  VENCIDA: 'Vencida',
};

@Pipe({
  name: 'paymentStatus',
  standalone: true,
})
export class PaymentStatusPipe implements PipeTransform {
  transform(
    value: PaymentStatus,
    format: 'class' | 'text' = 'text'
  ): string {
    if (format === 'class') {
      return STATUS_CLASSES[value] || 'bg-gray-100 text-gray-800';
    }
    return STATUS_TEXTS[value] || value;
  }
}
