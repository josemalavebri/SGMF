import { TestBed } from '@angular/core/testing';
import { TipoIngreso } from './tipo-ingreso.service';

describe('TipoIngreso', () => {
  let service: TipoIngreso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoIngreso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
