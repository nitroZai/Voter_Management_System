import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSuccessComponent } from './member-success.component';

describe('MemberSuccessComponent', () => {
  let component: MemberSuccessComponent;
  let fixture: ComponentFixture<MemberSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
