import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoIngresoTable } from './tipo-ingreso-table';

describe('TipoIngresoTable', () => {
  let component: TipoIngresoTable;
  let fixture: ComponentFixture<TipoIngresoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIngresoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoIngresoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
