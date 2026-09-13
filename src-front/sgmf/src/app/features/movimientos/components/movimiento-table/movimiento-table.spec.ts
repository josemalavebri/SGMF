import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoTable } from './movimiento-table';

describe('MovimientoTable', () => {
  let component: MovimientoTable;
  let fixture: ComponentFixture<MovimientoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
