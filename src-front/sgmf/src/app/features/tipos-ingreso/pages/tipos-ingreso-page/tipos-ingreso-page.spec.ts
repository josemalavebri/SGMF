import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiposIngresoPage } from './tipos-ingreso-page';

describe('TiposIngresoPage', () => {
  let component: TiposIngresoPage;
  let fixture: ComponentFixture<TiposIngresoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposIngresoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TiposIngresoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
