import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadValidationListComponent } from './lead-validation-list.component';

describe('LeadValidationListComponent', () => {
  let component: LeadValidationListComponent;
  let fixture: ComponentFixture<LeadValidationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadValidationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadValidationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
