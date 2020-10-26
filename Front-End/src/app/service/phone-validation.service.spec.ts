import { TestBed } from '@angular/core/testing';

import { PhoneValidationService } from './phone-validation.service';

describe('PhoneValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneValidationService = TestBed.get(PhoneValidationService);
    expect(service).toBeTruthy();
  });
});
