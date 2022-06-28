import { TestBed } from '@angular/core/testing';

import { MemberPanelService } from './member-panel.service';

describe('MemberPanelService', () => {
  let service: MemberPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
