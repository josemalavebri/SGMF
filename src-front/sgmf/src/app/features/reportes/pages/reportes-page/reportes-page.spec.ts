import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesPage } from './reportes-page';

describe('ReportesPage', () => {
  let component: ReportesPage;
  let fixture: ComponentFixture<ReportesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
