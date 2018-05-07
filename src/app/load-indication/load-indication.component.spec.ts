import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadIndicationComponent } from './load-indication.component';

describe('LoadIndicationComponent', () => {
  let component: LoadIndicationComponent;
  let fixture: ComponentFixture<LoadIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
