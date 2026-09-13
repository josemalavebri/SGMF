import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoFilter } from './movimiento-filter';

describe('MovimientoFilter', () => {
  let component: MovimientoFilter;
  let fixture: ComponentFixture<MovimientoFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
