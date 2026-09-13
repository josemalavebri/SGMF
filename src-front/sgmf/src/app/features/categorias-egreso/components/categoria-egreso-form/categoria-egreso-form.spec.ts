import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEgresoForm } from './categoria-egreso-form';

describe('CategoriaEgresoForm', () => {
  let component: CategoriaEgresoForm;
  let fixture: ComponentFixture<CategoriaEgresoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEgresoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaEgresoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
