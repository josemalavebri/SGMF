import { TestBed } from '@angular/core/testing';
import { CategoriaEgreso } from './categoria-egreso.service';

describe('CategoriaEgreso', () => {
  let service: CategoriaEgreso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaEgreso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
