import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirige la ruta raíz ('') a '/payments'
  {
    path: '',
    redirectTo: '/payments',
    pathMatch: 'full',
  },
  // Carga el módulo de solicitudes de pago cuando se navega a '/payments'
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payment-requests/payment-requests.module').then(
        (m) => m.PaymentRequestsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}