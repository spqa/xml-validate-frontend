import {inject, TestBed} from '@angular/core/testing';

import {DiffXmlService} from './diff-xml.service';

describe('DiffXmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiffXmlService]
    });
  });

  it('should be created', inject([DiffXmlService], (service: DiffXmlService) => {
    expect(service).toBeTruthy();
  }));
});
