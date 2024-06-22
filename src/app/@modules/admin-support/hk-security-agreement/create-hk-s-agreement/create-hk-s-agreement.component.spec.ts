import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHkSAgreementComponent } from './create-hk-s-agreement.component';

describe('CreateHkSAgreementComponent', () => {
  let component: CreateHkSAgreementComponent;
  let fixture: ComponentFixture<CreateHkSAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHkSAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHkSAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
