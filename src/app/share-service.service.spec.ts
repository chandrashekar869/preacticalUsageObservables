import { TestBed, inject } from '@angular/core/testing';

import { ShareServiceService } from './share-service.service';

describe('ShareServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareServiceService]
    });
  });

  it('should be created', inject([ShareServiceService], (service: ShareServiceService) => {
    expect(service).toBeTruthy();
  }));
});
