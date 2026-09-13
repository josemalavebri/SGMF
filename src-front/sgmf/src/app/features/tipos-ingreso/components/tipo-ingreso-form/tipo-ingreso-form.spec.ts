import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoIngresoForm } from './tipo-ingreso-form';

describe('TipoIngresoForm', () => {
  let component: TipoIngresoForm;
  let fixture: ComponentFixture<TipoIngresoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIngresoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoIngresoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
