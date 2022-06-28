import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNotVerifiedComponent } from './member-not-verified.component';

describe('MemberNotVerifiedComponent', () => {
  let component: MemberNotVerifiedComponent;
  let fixture: ComponentFixture<MemberNotVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberNotVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
