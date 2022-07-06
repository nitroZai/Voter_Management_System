import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAddPostComponent } from './candidate-add-post.component';

describe('CandidateAddPostComponent', () => {
  let component: CandidateAddPostComponent;
  let fixture: ComponentFixture<CandidateAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAddPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
