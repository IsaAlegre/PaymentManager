import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulo de rutas de esta feature
import { PaymentRequestsRoutingModule } from './payment-requests-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    PaymentRequestsRoutingModule,
  ],
  // PROVIDERS: Registra los servicios.
  providers: [],
})
export class PaymentRequestsModule {}