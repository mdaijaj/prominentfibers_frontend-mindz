import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HkSecurityAgreementComponent } from './hk-security-agreement.component';

describe('HkSecurityAgreementComponent', () => {
  let component: HkSecurityAgreementComponent;
  let fixture: ComponentFixture<HkSecurityAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HkSecurityAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HkSecurityAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
