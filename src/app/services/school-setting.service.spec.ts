import { TestBed, inject } from '@angular/core/testing';

import { SchoolSettingService } from './school-setting.service';

describe('SchoolSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolSettingService]
    });
  });

  it('should be created', inject([SchoolSettingService], (service: SchoolSettingService) => {
    expect(service).toBeTruthy();
  }));
});
