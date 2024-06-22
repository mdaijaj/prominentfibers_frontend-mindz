import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HkSecurityAgreementListComponent } from './hk-security-agreement-list.component';

describe('HkSecurityAgreementListComponent', () => {
  let component: HkSecurityAgreementListComponent;
  let fixture: ComponentFixture<HkSecurityAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HkSecurityAgreementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HkSecurityAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
