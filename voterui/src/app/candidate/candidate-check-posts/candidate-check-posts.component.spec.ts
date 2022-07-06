import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCheckPostsComponent } from './candidate-check-posts.component';

describe('CandidateCheckPostsComponent', () => {
  let component: CandidateCheckPostsComponent;
  let fixture: ComponentFixture<CandidateCheckPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCheckPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCheckPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
