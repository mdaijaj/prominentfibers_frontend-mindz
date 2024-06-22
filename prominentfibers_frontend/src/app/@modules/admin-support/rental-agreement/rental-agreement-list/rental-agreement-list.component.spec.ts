import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAgreementListComponent } from './rental-agreement-list.component';

describe('RentalAgreementListComponent', () => {
  let component: RentalAgreementListComponent;
  let fixture: ComponentFixture<RentalAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalAgreementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
