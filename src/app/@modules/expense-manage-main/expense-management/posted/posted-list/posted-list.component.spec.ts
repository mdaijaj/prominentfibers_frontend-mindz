import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedListComponent } from './posted-list.component';

describe('PostedListComponent', () => {
  let component: PostedListComponent;
  let fixture: ComponentFixture<PostedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
