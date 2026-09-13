import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceSummary } from './balance-summary';

describe('BalanceSummary', () => {
  let component: BalanceSummary;
  let fixture: ComponentFixture<BalanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
