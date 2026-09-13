import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoCreatePage } from './movimiento-create-page';

describe('MovimientoCreatePage', () => {
  let component: MovimientoCreatePage;
  let fixture: ComponentFixture<MovimientoCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
