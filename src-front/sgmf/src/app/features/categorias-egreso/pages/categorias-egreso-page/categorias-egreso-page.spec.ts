import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasEgresoPage } from './categorias-egreso-page';

describe('CategoriasEgresoPage', () => {
  let component: CategoriasEgresoPage;
  let fixture: ComponentFixture<CategoriasEgresoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasEgresoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasEgresoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
