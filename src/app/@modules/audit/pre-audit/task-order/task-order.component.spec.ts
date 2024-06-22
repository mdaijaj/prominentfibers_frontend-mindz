import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOrderListComponent } from './task-order.component';

describe('TaskOrderListComponent', () => {
  let component: TaskOrderListComponent;
  let fixture: ComponentFixture<TaskOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
