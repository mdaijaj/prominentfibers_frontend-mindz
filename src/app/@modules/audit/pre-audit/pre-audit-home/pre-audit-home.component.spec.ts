import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAuditHomeComponent } from './pre-audit-home.component';

describe('PreAuditHomeComponent', () => {
  let component: PreAuditHomeComponent;
  let fixture: ComponentFixture<PreAuditHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreAuditHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAuditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
