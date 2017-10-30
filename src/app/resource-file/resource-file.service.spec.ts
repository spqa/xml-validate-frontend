import {inject, TestBed} from '@angular/core/testing';

import {ResourceFileService} from './resource-file.service';

describe('ResourceFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceFileService]
    });
  });

  it('should be created', inject([ResourceFileService], (service: ResourceFileService) => {
    expect(service).toBeTruthy();
  }));
});
