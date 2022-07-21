import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinfoComponent } from './homeinfo.component';

describe('HomeinfoComponent', () => {
  let component: HomeinfoComponent;
  let fixture: ComponentFixture<HomeinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
