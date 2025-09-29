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

    let errors: ValidationErrors = {};

    if (fechaVto) {
        const vto = new Date(fechaVto + 'T00:00:00'); 
        if (vto < hoy) {
        errors['fechaVencida'] = 'La fecha de vencimiento no puede ser anterior a hoy';
        }
    }

    if (fecha2doVto) {
        const vto2 = new Date(fecha2doVto + 'T00:00:00');
        if (vto2 < hoy) {
        errors['segundaFechaVencida'] = 'La segunda fecha de vencimiento no puede ser anterior a hoy';
        }
    }

    if (errors['fechaVencida']) {
        form.get('fecha_vto')?.setErrors({ fechaVencida: true });
    }
    if (errors['segundaFechaVencida']) {
        form.get('fecha_2do_vto')?.setErrors({ segundaFechaVencida: true });
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
      importe: this.fb.control(null, { validators: [Validators.required, importeValido] }),
      fecha_vto: this.fb.control('', { validators: [Validators.required] }),
      recargo: this.fb.control(null, { validators: [importeValido] }),
      fecha_2do_vto: this.fb.control(''),
      referencia_externa: this.fb.control('', { validators: [Validators.required] }),
      referencia_externa_2: this.fb.control(''),
      url_redirect: this.fb.control('https://sandbox.helipagos.com', { validators: [Validators.required] }),
      webhook: this.fb.control(''),
      qr: this.fb.control(true),
    }, { validators: [vencimientoNoAnteriorHoy]});
  }


  onSubmit() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const formValue = this.form.getRawValue();

    // Construimos el cuerpo del request de forma segura
    const body: CreatePaymentRequest = {
        // Campos obligatorios
        descripcion: formValue.descripcion!,
        importe: Math.round((formValue.importe ?? 0) * 100),
        fecha_vto: formValue.fecha_vto!, // <-- SIMPLEMENTE SE TOMA EL VALOR DIRECTO
        referencia_externa: formValue.referencia_externa!,
        url_redirect: formValue.url_redirect!,
        webhook: formValue.webhook!,
        qr: formValue.qr!,

        // Campos opcionales (se añaden solo si tienen valor)
        ...(formValue.recargo && { recargo: Math.round(formValue.recargo * 100) }),
        ...(formValue.fecha_2do_vto && { fecha_2do_vto: formValue.fecha_2do_vto }),
        ...(formValue.referencia_externa_2 && { referencia_externa_2: formValue.referencia_externa_2 }),
    };

    // El console.log para verificar
    console.log('Body enviado:', body);

    this.create.emit(body);
}
  onClose() {
    this.close.emit();
  }

  get f() {
    return this.form.controls;
  }
}
