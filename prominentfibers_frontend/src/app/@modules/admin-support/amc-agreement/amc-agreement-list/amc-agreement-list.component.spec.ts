import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcAgreementListComponent } from './amc-agreement-list.component';

describe('AmcAgreementListComponent', () => {
  let component: AmcAgreementListComponent;
  let fixture: ComponentFixture<AmcAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcAgreementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmcAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
