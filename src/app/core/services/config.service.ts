import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly baseUrl = `${environment.apiUrl}/api/solicitud_pago/v1`;

  get apiToken(): string {
    return environment.apiToken;
  }
  
  get solicitudPagoBase(): string {
    return this.baseUrl;
  }

  get solicitudPagoPaged(): string {
    return `${this.baseUrl}/page/solicitud_pago`;
  }

  get solicitudPagoById(): string {
    return `${this.baseUrl}/get_solicitud_pago`;
  }

  get solicitudPagoCheckout(): string {
    return `${this.baseUrl}/checkout/solicitud_pago`;
  }
}
