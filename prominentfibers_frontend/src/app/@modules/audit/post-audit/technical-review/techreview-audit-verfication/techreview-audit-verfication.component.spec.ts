import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechreviewAuditVerficationComponent } from './techreview-audit-verfication.component';

describe('TechreviewAuditVerficationComponent', () => {
  let component: TechreviewAuditVerficationComponent;
  let fixture: ComponentFixture<TechreviewAuditVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechreviewAuditVerficationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechreviewAuditVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
