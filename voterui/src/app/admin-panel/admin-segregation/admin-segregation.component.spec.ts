import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSegregationComponent } from './admin-segregation.component';

describe('AdminSegregationComponent', () => {
  let component: AdminSegregationComponent;
  let fixture: ComponentFixture<AdminSegregationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSegregationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSegregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
