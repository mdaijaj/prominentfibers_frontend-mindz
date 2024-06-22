import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryActionComponent } from './salary-action.component';

describe('SalaryActionComponent', () => {
  let component: SalaryActionComponent;
  let fixture: ComponentFixture<SalaryActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
