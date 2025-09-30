import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  PaymentRequest,
  CreatePaymentRequest,
  PaginatedResponse,
} from '../models/payment-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentRequestsService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  getPaymentRequests(
    pageNumber: number,
    pageSize: number,
  ): Observable<PaginatedResponse<PaymentRequest>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<PaymentRequest>>(
      this.configService.solicitudPagoPaged,
      { params }
    );
  }

  getPaymentRequestById(id: number): Observable<PaymentRequest | undefined> {
    const params = new HttpParams().set('id', id.toString());

    return this.http
      .post<PaymentRequest[]>(this.configService.solicitudPagoById, {}, { params })
      .pipe(
        map((response) => (response && response.length > 0 ? response[0] : undefined))
      );
}

  createPaymentRequest(body: CreatePaymentRequest): Observable<CreatePaymentRequest> {
    return this.http.post<CreatePaymentRequest>(this.configService.solicitudPagoCheckout, body);
  }
}