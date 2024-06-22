import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingActionComponent } from './my-pending-action.component';

describe('MyPendingActionComponent', () => {
  let component: MyPendingActionComponent;
  let fixture: ComponentFixture<MyPendingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPendingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPendingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
