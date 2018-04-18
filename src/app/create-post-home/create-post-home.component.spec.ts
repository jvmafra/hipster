import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostHomeComponent } from './create-post-home.component';

describe('CreatePostHomeComponent', () => {
  let component: CreatePostHomeComponent;
  let fixture: ComponentFixture<CreatePostHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePostHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
