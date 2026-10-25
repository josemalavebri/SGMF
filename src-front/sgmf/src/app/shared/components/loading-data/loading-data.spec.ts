import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingData } from './loading-data';

describe('LoadingData', () => {
  let component: LoadingData;
  let fixture: ComponentFixture<LoadingData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingData],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
