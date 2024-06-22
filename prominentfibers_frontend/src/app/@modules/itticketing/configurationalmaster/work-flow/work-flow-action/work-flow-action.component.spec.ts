import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowActionComponent } from './work-flow-action.component';

describe('WorkFlowActionComponent', () => {
  let component: WorkFlowActionComponent;
  let fixture: ComponentFixture<WorkFlowActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFlowActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkFlowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
