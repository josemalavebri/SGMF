import { TestBed } from '@angular/core/testing';
import { AsyncState } from './async-state.service';

describe('AsyncState', () => {
  let service: AsyncState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
