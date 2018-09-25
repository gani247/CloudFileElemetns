import { TestBed } from '@angular/core/testing';

import { CloudObjectsService } from './cloud-objects.service';

describe('CloudObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudObjectsService = TestBed.get(CloudObjectsService);
    expect(service).toBeTruthy();
  });
});
