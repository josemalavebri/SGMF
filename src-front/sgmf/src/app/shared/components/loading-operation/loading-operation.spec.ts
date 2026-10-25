import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingOperation } from './loading-operation';

describe('LoadingOperation', () => {
  let component: LoadingOperation;
  let fixture: ComponentFixture<LoadingOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingOperation],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingOperation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
