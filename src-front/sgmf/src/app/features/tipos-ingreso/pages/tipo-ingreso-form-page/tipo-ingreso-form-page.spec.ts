import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoIngresoFormPage } from './tipo-ingreso-form-page';

describe('TipoIngresoFormPage', () => {
  let component: TipoIngresoFormPage;
  let fixture: ComponentFixture<TipoIngresoFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIngresoFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoIngresoFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
