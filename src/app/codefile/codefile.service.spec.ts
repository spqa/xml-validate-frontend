import {inject, TestBed} from '@angular/core/testing';

import {CodefileService} from './codefile.service';

describe('CodefileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodefileService]
    });
  });

  it('should be created', inject([CodefileService], (service: CodefileService) => {
    expect(service).toBeTruthy();
  }));
});
