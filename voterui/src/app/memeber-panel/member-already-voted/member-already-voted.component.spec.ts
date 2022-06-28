import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAlreadyVotedComponent } from './member-already-voted.component';

describe('MemberAlreadyVotedComponent', () => {
  let component: MemberAlreadyVotedComponent;
  let fixture: ComponentFixture<MemberAlreadyVotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAlreadyVotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAlreadyVotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
