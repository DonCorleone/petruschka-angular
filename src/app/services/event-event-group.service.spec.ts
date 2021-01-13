import { TestBed } from '@angular/core/testing';

import { EventEventGroupService } from './event-event-group.service';

describe('EventEventgroupService', () => {
  let service: EventEventGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEventGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
