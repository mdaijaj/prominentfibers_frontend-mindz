import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingTaskComponent } from './my-pending-task.component';

describe('MyPendingTaskComponent', () => {
  let component: MyPendingTaskComponent;
  let fixture: ComponentFixture<MyPendingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPendingTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPendingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
