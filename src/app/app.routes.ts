// src/app/app.routes.ts (Archivo nuevo)

import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige la ruta raíz ('') a '/payments'
  {
    path: '',
    redirectTo: '/payments',
    pathMatch: 'full',
  },
  // Carga las rutas de la feature 'payment-requests'
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payment-requests/payment-requests.module').then(
        (m) => m.PaymentRequestsModule // Asumiendo que tus rutas de feature también son standalone
      ),
  },
];