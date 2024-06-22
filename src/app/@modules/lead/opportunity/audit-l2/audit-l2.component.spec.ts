import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditL2Component } from './audit-l2.component';

describe('AuditL2Component', () => {
  let component: AuditL2Component;
  let fixture: ComponentFixture<AuditL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditL2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
