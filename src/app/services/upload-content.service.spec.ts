import { TestBed } from '@angular/core/testing';

import { UploadContentService } from './upload-content.service';

describe('UploadContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadContentService = TestBed.get(UploadContentService);
    expect(service).toBeTruthy();
  });
});
