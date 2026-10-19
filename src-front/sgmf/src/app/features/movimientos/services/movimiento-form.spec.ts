import { TestBed } from '@angular/core/testing';
import { MovimientoForm } from './movimiento-form.service';

describe('MovimientoForm', () => {
  let service: MovimientoForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
