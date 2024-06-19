import { TestBed } from '@angular/core/testing';

import { CoinRealTimeService } from './coin-real-time.service';

describe('CoinRealTimeService', () => {
  let service: CoinRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
