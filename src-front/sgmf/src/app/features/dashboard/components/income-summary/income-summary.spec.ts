import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncomeSummary } from './income-summary';

describe('IncomeSummary', () => {
  let component: IncomeSummary;
  let fixture: ComponentFixture<IncomeSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
