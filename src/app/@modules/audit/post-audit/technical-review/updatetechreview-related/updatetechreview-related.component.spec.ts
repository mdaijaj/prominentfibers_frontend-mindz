import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetechreviewRelatedComponent } from './updatetechreview-related.component';

describe('UpdatetechreviewRelatedComponent', () => {
  let component: UpdatetechreviewRelatedComponent;
  let fixture: ComponentFixture<UpdatetechreviewRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetechreviewRelatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatetechreviewRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
