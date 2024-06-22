import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateLeadComponent } from './validate-lead.component';

describe('ValidateLeadComponent', () => {
  let component: ValidateLeadComponent;
  let fixture: ComponentFixture<ValidateLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
