import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcAgreementComponent } from './amc-agreement.component';

describe('AmcAgreementComponent', () => {
  let component: AmcAgreementComponent;
  let fixture: ComponentFixture<AmcAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmcAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
