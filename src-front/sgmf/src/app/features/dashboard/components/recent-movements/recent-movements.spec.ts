import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentMovements } from './recent-movements';

describe('RecentMovements', () => {
  let component: RecentMovements;
  let fixture: ComponentFixture<RecentMovements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentMovements],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentMovements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
