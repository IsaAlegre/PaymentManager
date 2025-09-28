import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';

@Component({
  selector: 'app-payment-detail-modal',
  standalone: true,
  imports: [CommonModule, PaymentStatusPipe],
  templateUrl: './payment-detail-modal.component.html',
})
export class PaymentDetailModalComponent {
  /** Pago seleccionado a mostrar */
  @Input() payment: PaymentRequest | null = null;

  /** Evento para cerrar el modal */
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
