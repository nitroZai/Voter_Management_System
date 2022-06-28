import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeberPanelComponent } from './memeber-panel.component';

describe('MemeberPanelComponent', () => {
  let component: MemeberPanelComponent;
  let fixture: ComponentFixture<MemeberPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeberPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeberPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
