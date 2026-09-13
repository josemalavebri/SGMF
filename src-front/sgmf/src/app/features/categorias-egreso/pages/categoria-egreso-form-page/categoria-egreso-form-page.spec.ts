import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEgresoFormPage } from './categoria-egreso-form-page';

describe('CategoriaEgresoFormPage', () => {
  let component: CategoriaEgresoFormPage;
  let fixture: ComponentFixture<CategoriaEgresoFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEgresoFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaEgresoFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
