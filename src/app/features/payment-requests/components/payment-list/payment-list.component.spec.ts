import { ComponentFixture, TestBed} from '@angular/core/testing';
import { PaymentListComponent } from './payment-list.component';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';
import { By } from '@angular/platform-browser';
import { PaymentRequest } from '../../models/payment-request.model';
import { provideZonelessChangeDetection } from '@angular/core'

describe('PaymentListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;

  const mockPayments: PaymentRequest[] = [
    {
      id_sp: 123,
      codigo_barra: '000111222333',
      estado_pago: 'PENDIENTE',
      medio_pago: 'VISA',
      descripcion: 'Pago de prueba',
      importe_pagado: 100,
      referencia_externa: 'ABC123',
      fecha_creacion: '2023-09-01T00:00:00Z',
      fecha_pago: null,
      fecha_vencimiento: '2023-10-01T00:00:00Z',
      segunda_fecha_vencimiento: null
    },
    {
      id_sp: 456,
      codigo_barra: '444555666777',
      estado_pago: 'PROCESADA',
      medio_pago: 'MASTERCARD',
      descripcion: 'Otro pago',
      importe_pagado: 250,
      referencia_externa: 'XYZ789',
      fecha_creacion: '2023-09-15T00:00:00Z',
      fecha_pago: '2023-09-20T00:00:00Z',
      fecha_vencimiento: '2023-10-15T00:00:00Z',
      segunda_fecha_vencimiento: null
    }
  ];


    beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PaymentListComponent, PaymentStatusPipe],
      // 1. Usa el helper para la configuración zoneless.
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    component.payments = mockPayments;
    fixture.detectChanges();
  });
  it('debería renderizar la tabla con los pagos', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('123');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Pago de prueba');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toContain('$100.00');
  });

  it('debería emitir paymentSelect al hacer click en una fila', () => {
    spyOn(component.paymentSelect, 'emit');
    const row = fixture.debugElement.queryAll(By.css('tbody tr'))[0];

    row.nativeElement.click();
    // 2. Dispara la detección de cambios manualmente después del evento.
    fixture.detectChanges();

    expect(component.paymentSelect.emit).toHaveBeenCalledWith(mockPayments[0]);
  });

  it('debería emitir paymentDetail al hacer click en "Ver Detalles"', () => {
    spyOn(component.paymentDetail, 'emit');
    const button = fixture.debugElement.queryAll(By.css('button'))[0];

    button.nativeElement.click();
    // 2. Dispara la detección de cambios manualmente después del evento.
    fixture.detectChanges();

    expect(component.paymentDetail.emit).toHaveBeenCalledWith(mockPayments[0]);
  });
});
