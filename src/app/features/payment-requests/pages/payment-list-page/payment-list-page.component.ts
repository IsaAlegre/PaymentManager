import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of, debounceTime, distinctUntilChanged } from 'rxjs';
import { PaymentListComponent } from '../../components/payment-list/payment-list.component';
import { PaymentLoaderComponent } from '../../components/payment-loader/payment-loader.component';
import { PaymentRequestsService } from '../../services/payment-requests.service';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchBoxComponent } from '../../../../shared/components/search-box.component';


@Component({
  selector: 'app-payment-list-page',
  standalone: true,
  imports: [
    CommonModule,
    PaymentListComponent,
    PaymentLoaderComponent,
    PaginationComponent,
    ReactiveFormsModule,
    SearchBoxComponent
  ],
  templateUrl: './payment-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListPageComponent {
  private paymentService = inject(PaymentRequestsService);

  public isLoading = signal(true);
  public error = signal<string | null>(null);
  public errorMessage: string | null = null;

  private _currentPage = signal(1);
  private _totalElements = signal(0);

  public currentPage = this._currentPage.asReadonly();
  public itemsPerPage = signal(10).asReadonly();
  public totalElements = this._totalElements.asReadonly();
  public pagos = signal<PaymentRequest[]>([]);

  searchControl = new FormControl('');

  constructor() {
    this.loadPayments();
  }

  /** 🔎 Búsqueda por ID */
  onSearchById(id: string): void {
    if (!id) {
      this.onRefresh();
      return;
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      this.error.set('El ID debe ser un número válido.');
      return;
    }

    this.isLoading.set(true);
    this.paymentService.getPaymentRequestById(numericId)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payment) => {
          if (payment) {
            this.pagos.set([payment]);
            this._totalElements.set(1);
          } else {
            this.pagos.set([]);
            this._totalElements.set(0);
            this.errorMessage = `No se encontró ninguna solicitud con ID ${id}`;
          }
        },
        error: () => {
          this.error.set('Ocurrió un error al buscar la solicitud.');
        }
      });
  }

  /** 📄 Cargar lista paginada */
  loadPayments(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.errorMessage = null;
    const pageNumber = this._currentPage() - 1;

    this.paymentService
      .getPaymentRequests(pageNumber, this.itemsPerPage())
      .pipe(
        catchError(() => {
          this.error.set('No se pudieron cargar las solicitudes de pago. Verifique la conexión o la configuración del proxy.');
          this.errorMessage = 'Ocurrió un error al cargar los pagos. Intenta nuevamente más tarde.';
          return of({
            content: [],
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 0,
            pageable: {} as any,
            last: true,
            sort: {} as any,
            first: true,
            numberOfElements: 0,
            empty: true
          });
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.pagos.set(response.content);
        this._totalElements.set(response.totalElements);
      });
  }

  /** 🔄 Refrescar lista */
  onRefresh(): void {
    this._currentPage.set(1);
    this.loadPayments();
  }

  /** 📑 Cambiar página */
  onPageChange(page: number): void {
    this._currentPage.set(page);
    this.loadPayments();
  }
}
