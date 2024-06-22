import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCompletedListComponent } from './audit-completed-list.component';

describe('AuditCompletedListComponent', () => {
  let component: AuditCompletedListComponent;
  let fixture: ComponentFixture<AuditCompletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditCompletedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
