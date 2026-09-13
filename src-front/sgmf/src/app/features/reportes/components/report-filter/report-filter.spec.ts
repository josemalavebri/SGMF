import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportFilter } from './report-filter';

describe('ReportFilter', () => {
  let component: ReportFilter;
  let fixture: ComponentFixture<ReportFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
