import { TestBed } from '@angular/core/testing';
import { MovimientoStore } from './movimiento-store.service';

describe('MovimientoStore', () => {
  let service: MovimientoStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
