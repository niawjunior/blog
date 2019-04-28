import { TestBed } from '@angular/core/testing';

import { GetContentService } from './get-content.service';

describe('GetContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetContentService = TestBed.get(GetContentService);
    expect(service).toBeTruthy();
  });
});
