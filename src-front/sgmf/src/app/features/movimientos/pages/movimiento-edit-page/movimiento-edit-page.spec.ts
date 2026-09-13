import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoEditPage } from './movimiento-edit-page';

describe('MovimientoEditPage', () => {
  let component: MovimientoEditPage;
  let fixture: ComponentFixture<MovimientoEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
