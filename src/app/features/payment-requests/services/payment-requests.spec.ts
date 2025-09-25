import { TestBed } from '@angular/core/testing';

import { PaymentRequests } from './payment-requests';

describe('PaymentRequests', () => {
  let service: PaymentRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
