// src/app/app.routes.ts (Archivo nuevo)

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/payments',
    pathMatch: 'full',
  },
  
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payment-requests/payment-requests.module').then(
        (m) => m.PaymentRequestsModule 
      ),
  },
];