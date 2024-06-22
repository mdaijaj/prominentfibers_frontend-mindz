import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmcAgreementComponent } from './create-amc-agreement.component';

describe('CreateAmcAgreementComponent', () => {
  let component: CreateAmcAgreementComponent;
  let fixture: ComponentFixture<CreateAmcAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAmcAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAmcAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
