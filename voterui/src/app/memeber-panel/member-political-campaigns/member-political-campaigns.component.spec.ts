import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPoliticalCampaignsComponent } from './member-political-campaigns.component';

describe('MemberPoliticalCampaignsComponent', () => {
  let component: MemberPoliticalCampaignsComponent;
  let fixture: ComponentFixture<MemberPoliticalCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPoliticalCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPoliticalCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
