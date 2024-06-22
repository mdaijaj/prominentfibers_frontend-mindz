import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAgreementListComponent } from './insurance-agreement-list.component';

describe('InsuranceAgreementListComponent', () => {
  let component: InsuranceAgreementListComponent;
  let fixture: ComponentFixture<InsuranceAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceAgreementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
