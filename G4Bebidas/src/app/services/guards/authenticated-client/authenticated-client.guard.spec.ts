import { TestBed } from '@angular/core/testing';

import { AuthenticatedClientGuard } from './authenticated-client.guard';

describe('AuthenticatedClientGuard', () => {
  let guard: AuthenticatedClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatedClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
