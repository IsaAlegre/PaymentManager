export interface PaymentRequest {
  id_sp: number;
  codigo_barra: string;
  estado_pago: PaymentStatus;
  medio_pago: string;
  descripcion: string;
  importe_pagado: number;
  referencia_externa: string;
  fecha_creacion: string;
  fecha_pago: string | null;
  fecha_vencimiento: string;
  segunda_fecha_vencimiento: string | null;

  // Campos que a veces están y a veces no
  importe?: number;
  importe_vencido?: number;
  cuotas?: number;
  fecha_acreditacion?: string | null;
  fecha_actualizacion?: string;
  fecha_contracargo?: string | null;
  referencia_externa_2?: string;
}

export type PaymentStatus = 'PROCESADA' | 'PENDIENTE' | 'CANCELADA' | 'RECHAZADA' | 'VENCIDA';

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // número de página actual (base 0)
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type PaginatedPaymentResponse = PaginatedResponse<PaymentRequest>;

export interface CreatePaymentRequest {
  importe: number;
  fecha_vto: string;
  recargo?: number;
  fecha_2do_vto?: string;
  descripcion: string;
  referencia_externa: string;
  referencia_externa_2?: string;
  url_redirect: string;
  webhook: string;
  qr: boolean;
}