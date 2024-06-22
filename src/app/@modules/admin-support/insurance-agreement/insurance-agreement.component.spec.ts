import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAgreementComponent } from './insurance-agreement.component';

describe('InsuranceAgreementComponent', () => {
  let component: InsuranceAgreementComponent;
  let fixture: ComponentFixture<InsuranceAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
