import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceReport } from './balance-report';

describe('BalanceReport', () => {
  let component: BalanceReport;
  let fixture: ComponentFixture<BalanceReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceReport],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
