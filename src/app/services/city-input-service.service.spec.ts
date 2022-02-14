import { TestBed } from '@angular/core/testing';

import { CityInputService } from './city-input-service.service';

describe('CityInputServiceService', () => {
  let service: CityInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
