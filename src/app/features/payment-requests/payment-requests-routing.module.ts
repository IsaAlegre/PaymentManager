import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentListPageComponent } from './pages/payment-list-page/payment-list-page.component';

const routes: Routes = [
  {
    path: '', // La ruta base de este módulo (que será /payments)
    component: PaymentListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRequestsRoutingModule { }