import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditL1Component } from './audit-l1.component';

describe('AuditL1Component', () => {
  let component: AuditL1Component;
  let fixture: ComponentFixture<AuditL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditL1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
