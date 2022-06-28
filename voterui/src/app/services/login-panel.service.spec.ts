import { TestBed } from '@angular/core/testing';

import { LoginPanelService } from './login-panel.service';

describe('LoginPanelService', () => {
  let service: LoginPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
