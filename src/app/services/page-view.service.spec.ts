import { TestBed } from '@angular/core/testing';

import { PageViewService } from './page-view.service';

describe('PageViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageViewService = TestBed.get(PageViewService);
    expect(service).toBeTruthy();
  });
});
