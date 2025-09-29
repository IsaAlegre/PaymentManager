import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PaymentCreateModalComponent } from './payment-create-modal.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PaymentCreateModalComponent', () => {
  let component: PaymentCreateModalComponent;
  let fixture: ComponentFixture<PaymentCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PaymentCreateModalComponent],
      providers: [provideZonelessChangeDetection()] // 👈 clave para zoneless
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería deshabilitar el botón "Crear" si el formulario es inválido', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('debería mostrar error si la descripción es muy corta', () => {
    const descripcion = component.form.get('descripcion')!;
    descripcion.setValue('abc');
    descripcion.markAsTouched();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('p.text-red-500'));
    expect(error.nativeElement.textContent).toContain('La descripción es obligatoria');
  });

  it('debería mostrar error si el importe es 0', () => {
    const importe = component.form.get('importe')!;
    importe.setValue(0);
    importe.markAsTouched();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('p.text-red-500'));
    expect(error.nativeElement.textContent).toContain('El valor debe ser mayor a 0');
  });

  it('debería emitir "create" con datos normalizados cuando el formulario es válido', () => {
    spyOn(component.create, 'emit');

    const today = '2025-09-29';

    component.form.patchValue({
      descripcion: 'Pago de prueba',
      importe: 123.45,
      fecha_vto: today,
      recargo: 1.5,
      fecha_2do_vto: '',
      referencia_externa: 'REF123',
      referencia_externa_2: '',
      url_redirect: 'https://sandbox.helipagos.com',
      webhook: '',
      qr: true,
    });

    component.form.updateValueAndValidity();
    fixture.detectChanges();
    component.onSubmit();

    expect(component.create.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      descripcion: 'Pago de prueba',
      importe: 12345,
      recargo: 150,
      fecha_vto: today,
      referencia_externa: 'REF123'
    }));
  });

  it('debería emitir "close" al hacer click en Cancelar', () => {
    spyOn(component.close, 'emit');
    const cancelBtn = fixture.debugElement.query(By.css('button[type="button"]')).nativeElement;
    cancelBtn.click();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
