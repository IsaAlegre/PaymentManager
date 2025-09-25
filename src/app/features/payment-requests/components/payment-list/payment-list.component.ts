import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PaymentRequest } from '../../models/payment-request.model';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, PaymentStatusPipe],
  templateUrl: './payment-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListComponent {
  @Input({ required: true }) payments: PaymentRequest[] = [];
  @Output() paymentSelect = new EventEmitter<PaymentRequest>();
  @Output() paymentDetail = new EventEmitter<PaymentRequest>();

   onPaymentSelect(payment: PaymentRequest): void {
    this.paymentSelect.emit(payment);
  }
  onPaymentDetail(payment: PaymentRequest, event: Event): void {
    // no se dispare también el evento de selección de toda la fila.
    event.stopPropagation(); 
    this.paymentDetail.emit(payment);
  }
}