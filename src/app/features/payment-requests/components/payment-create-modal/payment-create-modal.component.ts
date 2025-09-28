import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';
import { CreatePaymentRequest } from '../../models/payment-request.model';

// Validador personalizado para fechas de vencimiento
function vencimientoNoAnteriorHoy(control: AbstractControl) {
    const form = control as FormGroup;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignora la hora

    const fechaVto = form.get('fecha_vto')?.value;
    const fecha2doVto = form.get('fecha_2do_vto')?.value;

    let errors: any = {};

    if (fechaVto) {
        const vto = new Date(fechaVto);
        vto.setHours(0, 0, 0, 0);
        if (vto < hoy) {
        errors.fecha_vto = 'La fecha de vencimiento no puede ser anterior a hoy';
        }
    }

    if (fecha2doVto) {
        const vto2 = new Date(fecha2doVto);
        vto2.setHours(0, 0, 0, 0);
        if (vto2 < hoy) {
        errors.fecha_2do_vto = 'La segunda fecha de vencimiento no puede ser anterior a hoy';
        }
    }

    return Object.keys(errors).length ? errors : null;
}

function importeValido(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value == null || value <= 0) return { invalid: 'El valor debe ser mayor a 0' };

  const [enteros, decimales] = value.toString().split('.');
  if (enteros.length > 6) {
    return { invalid: 'Máximo 6 enteros permitidos' };
  }
  if (decimales && decimales.length > 2) {
    return { invalid: 'Máximo 2 decimales permitidos' };
  }
  return null;
}

type CreatePaymentRequestForm = {
  descripcion: FormControl<string | null>;
  importe: FormControl<number | null>;
  fecha_vto: FormControl<string | null>;
  recargo: FormControl<number | null>;
  fecha_2do_vto: FormControl<string | null>;
  referencia_externa: FormControl<string | null>;
  referencia_externa_2: FormControl<string | null>;
  url_redirect: FormControl<string | null>;
  webhook: FormControl<string | null>;
  qr: FormControl<boolean | null>;
};

@Component({
  selector: 'app-payment-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-create-modal.component.html'
})
export class PaymentCreateModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<CreatePaymentRequest>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<CreatePaymentRequestForm>({
      descripcion: this.fb.control('', { validators: [Validators.required, Validators.minLength(5)] }),
      importe: this.fb.control(null, { validators: [Validators.required, Validators.min(1)] }),
      fecha_vto: this.fb.control('', { validators: [Validators.required] }),
      recargo: this.fb.control(null, { validators: [Validators.min(1)] }),
      fecha_2do_vto: this.fb.control(''),
      referencia_externa: this.fb.control('', { validators: [Validators.required] }),
      referencia_externa_2: this.fb.control(''),
      url_redirect: this.fb.control('https://sandbox.helipagos.com', { validators: [Validators.required] }),
      webhook: this.fb.control(''),
      qr: this.fb.control(true),
    }, { validators: [vencimientoNoAnteriorHoy]});
  }


  onSubmit() {
  if (this.form.valid) {
    let body: CreatePaymentRequest = { ...this.form.value };

    // Normalizar fechas
    body.fecha_vto = new Date(body.fecha_vto).toISOString().split('T')[0];
    if (body.fecha_2do_vto) {
      body.fecha_2do_vto = new Date(body.fecha_2do_vto).toISOString().split('T')[0];
    }

    // ✅ Convertir importe/recargo a enteros con 2 decimales implícitos
    body.importe = Math.round((this.form.value.importe ?? 0) * 100);
    body.recargo = Math.round((this.form.value.recargo ?? 0) * 100);

    console.log('Body enviado:', body); // 👈 Ver en consola

    this.create.emit(body);
  }
}
  onClose() {
    this.close.emit();
  }

  get f() {
    return this.form.controls;
  }
}
