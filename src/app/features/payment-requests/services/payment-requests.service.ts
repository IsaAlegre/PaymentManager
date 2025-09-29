import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  PaymentRequest,
  CreatePaymentRequest,
  PaginatedPaymentResponse,
} from '../models/payment-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentRequestsService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  private get resourceUrl(): string {
    return `${this.configService.apiUrl}/api/solicitud_pago/v1`;
  }

  getPaymentRequests(
    pageNumber: number,
    pageSize: number,
  ): Observable<PaginatedPaymentResponse> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedPaymentResponse>(
      `${this.resourceUrl}/page/solicitud_pago`,
      { params }
    );
  }

  getPaymentRequestById(id: number): Observable<PaymentRequest | undefined> {
    const params = new HttpParams().set('id', id.toString());

    return this.http
      .post<PaymentRequest[]>(`${this.resourceUrl}/get_solicitud_pago`, {}, { params })
      .pipe(
        map((response) => (response && response.length > 0 ? response[0] : undefined))
      );
}



  createPaymentRequest(body: CreatePaymentRequest): Observable<CreatePaymentRequest> {
    return this.http.post<CreatePaymentRequest>(`${this.resourceUrl}/checkout/solicitud_pago`, body);
  }
}