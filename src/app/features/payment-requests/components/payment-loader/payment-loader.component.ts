import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentLoaderComponent {
  @Input() message = 'Cargando...';
}
