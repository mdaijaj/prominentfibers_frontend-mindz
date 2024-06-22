import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuditRelatedComponent } from './update-audit-related.component';

describe('UpdateAuditRelatedComponent', () => {
  let component: UpdateAuditRelatedComponent;
  let fixture: ComponentFixture<UpdateAuditRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAuditRelatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuditRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
