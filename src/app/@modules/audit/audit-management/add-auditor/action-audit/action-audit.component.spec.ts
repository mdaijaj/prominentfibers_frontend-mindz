import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAuditComponent } from './action-audit.component';

describe('ActionAuditComponent', () => {
  let component: ActionAuditComponent;
  let fixture: ComponentFixture<ActionAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
