import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of, debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { PaymentListComponent } from '../../components/payment-list/payment-list.component';
import { PaymentLoaderComponent } from '../../components/payment-loader/payment-loader.component';
import { PaymentRequestsService } from '../../services/payment-requests.service';
import { CreatePaymentRequest, PaymentRequest } from '../../models/payment-request.model';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchBoxComponent } from '../../../../shared/components/search-box.component';
import { PaymentDetailModalComponent } from '../../components/payment-detail-modal/payment-detail-modal.component';
import { PaymentCreateModalComponent } from '../../components/payment-create-modal/payment-create-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-list-page',
  standalone: true,
  imports: [
    CommonModule,
    PaymentListComponent,
    PaymentLoaderComponent,
    PaginationComponent,
    ReactiveFormsModule,
    SearchBoxComponent,
    PaymentDetailModalComponent,
    PaymentCreateModalComponent,
  ],
  templateUrl: './payment-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListPageComponent implements OnInit, OnDestroy {
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

  private loadPaymentsTrigger$ = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor() {
  }
  ngOnInit(): void {
    this.loadPaymentsTrigger$.pipe(
      // switchMap cancela la petición anterior si llega una nueva
      switchMap((page) => {
        this.isLoading.set(true);
        this.error.set(null);
        this.errorMessage = null;
        this._currentPage.set(page); // Actualizamos la página actual
        const pageNumber = page - 1;

        return this.paymentService.getPaymentRequests(pageNumber, this.itemsPerPage()).pipe(
          catchError(() => {
            this.error.set('No se pudieron cargar las solicitudes de pago. Verifique la conexión o la configuración del proxy.');
            this.errorMessage = 'Ocurrió un error al cargar los pagos. Intenta nuevamente más tarde.';
            return of({ content: [], totalElements: 0 }); // Devolver un objeto con la estructura esperada
          }),
          finalize(() => this.isLoading.set(false))
        );
      }),
      // La suscripción se cancelará cuando el componente se destruya
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.pagos.set(response.content);
      this._totalElements.set(response.totalElements);
    });

    // Disparar la carga inicial
    this.loadPaymentsTrigger$.next(1);
  }

  // 8. Implementar ngOnDestroy para limpiar la suscripción
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

  /** Búsqueda por ID */
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

  /**Refrescar lista */
  onRefresh(): void {
    this._currentPage.set(1);
    this.loadPaymentsTrigger$.next(1);
  }

  /** Cambiar página */
  onPageChange(page: number): void {
    this.loadPaymentsTrigger$.next(page);
  }
  /** Detalle de pago */
  selectedPayment = signal<PaymentRequest | null>(null);
  private paymentRequestsService = inject(PaymentRequestsService);

  onPaymentDetail(payment: PaymentRequest): void {
    this.paymentRequestsService.getPaymentRequestById(payment.id_sp).subscribe(detalle => {
      if (detalle) {
        this.selectedPayment.set(detalle); 
      }
    });
  }

    onCloseDetail(): void {
      this.selectedPayment.set(null);
    }

  /** Crear nuevo solicitud de pago */
  isCreateModalOpen = signal(false);

  onOpenCreate(): void {
    this.isCreateModalOpen.set(true);
  }

  onCloseCreate(): void {
    this.isCreateModalOpen.set(false);
  }

  /** Manejo de errores de form solicitud de pago usando sweetAlert **/
  onCreatePayment(body: CreatePaymentRequest) {
    this.paymentService.createPaymentRequest(body).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud creada',
          text: 'La solicitud se generó correctamente',
          timer: 2000,
          showConfirmButton: false
        });

        if (res?.url_redirect) {
          window.location.href = res.url_redirect;
        }

        this.onCloseCreate();
        this.onRefresh();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la solicitud. Intenta de nuevo.'
        });
      }
    });
  }
}