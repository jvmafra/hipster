import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineUserComponent } from './timeline-user.component';

describe('TimelineUserComponent', () => {
  let component: TimelineUserComponent;
  let fixture: ComponentFixture<TimelineUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
