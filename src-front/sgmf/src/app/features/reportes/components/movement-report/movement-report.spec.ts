import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementReport } from './movement-report';

describe('MovementReport', () => {
  let component: MovementReport;
  let fixture: ComponentFixture<MovementReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementReport],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
