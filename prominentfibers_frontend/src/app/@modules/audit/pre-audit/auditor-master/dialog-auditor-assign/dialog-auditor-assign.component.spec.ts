import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAuditorAssignComponent } from './dialog-auditor-assign.component';

describe('DialogAuditorAssignComponent', () => {
  let component: DialogAuditorAssignComponent;
  let fixture: ComponentFixture<DialogAuditorAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAuditorAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAuditorAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
