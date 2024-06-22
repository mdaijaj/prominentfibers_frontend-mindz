import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkFlowComponent } from './view-work-flow.component';

describe('ViewWorkFlowComponent', () => {
  let component: ViewWorkFlowComponent;
  let fixture: ComponentFixture<ViewWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWorkFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
