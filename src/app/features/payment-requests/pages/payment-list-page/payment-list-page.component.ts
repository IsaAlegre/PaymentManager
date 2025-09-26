import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of, switchMap, debounceTime } from 'rxjs';
import { PaymentListComponent } from '../../components/payment-list/payment-list.component';
import { PaymentLoaderComponent } from '../../components/payment-loader/payment-loader.component';
import { PaymentRequestsService } from '../../services/payment-requests.service';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-payment-list-page',
  standalone: true,
  imports: [
    CommonModule,
    PaymentListComponent,
    PaymentLoaderComponent,
    PaginationComponent,
  ],
  templateUrl:'./payment-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListPageComponent {
  private paymentService = inject(PaymentRequestsService);

  public isLoading = signal(true);
  public error = signal<string | null>(null);
  errorMessage: string | null = null;

  private _currentPage = signal(1);
  private _totalElements = signal(0);

  public currentPage = this._currentPage.asReadonly();
  public itemsPerPage = signal(10).asReadonly();
  public totalElements = this._totalElements.asReadonly();
  public pagos = signal<PaymentRequest[]>([]);


  constructor() {
    this.loadPayments();

  }

  
  loadPayments(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.errorMessage = null;
    // La API usa paginación base 0, así que restamos 1
    const pageNumber = 1;

    this.paymentService
      .getPaymentRequests(pageNumber, this.itemsPerPage())
      .pipe(
        catchError((err) => {
          this.error.set('No se pudieron cargar las solicitudes de pago. Verifique la conexión o la configuración del proxy.');
          this.errorMessage = 'Ocurrió un error al cargar los pagos. Intenta nuevamente más tarde.';
          return of({ content: [], totalElements: 0, totalPages: 0, number: 0, size: 0, pageable: {} as any, last: true, sort: {} as any, first: true, numberOfElements: 0, empty: true });
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.pagos.set(response.content);
        this._totalElements.set(response.totalElements);
      });
  }

  onRefresh(): void {
    this._currentPage.set(1);
    this.loadPayments();
  }

  onPageChange(page: number): void {
    this._currentPage.set(page);
    this.loadPayments();
  }
}
