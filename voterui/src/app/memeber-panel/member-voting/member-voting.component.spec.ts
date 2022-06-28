import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVotingComponent } from './member-voting.component';

describe('MemberVotingComponent', () => {
  let component: MemberVotingComponent;
  let fixture: ComponentFixture<MemberVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
