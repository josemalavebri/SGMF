import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEgresoTable } from './categoria-egreso-table';

describe('CategoriaEgresoTable', () => {
  let component: CategoriaEgresoTable;
  let fixture: ComponentFixture<CategoriaEgresoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEgresoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaEgresoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
