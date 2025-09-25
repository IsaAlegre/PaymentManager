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

export type PaymentRequestsResponse = PaymentRequest[];

export interface Pageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedPaymentResponse {
  content: PaymentRequest[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // El número de la página actual (base 0)
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CreatePaymentRequest {
  descripcion: string;
  importe: number;
  referencia_externa?: string;
  fecha_vencimiento?: string;
}