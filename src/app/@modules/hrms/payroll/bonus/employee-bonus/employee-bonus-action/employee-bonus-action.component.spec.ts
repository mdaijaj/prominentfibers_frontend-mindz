import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBonusActionComponent } from './employee-bonus-action.component';

describe('EmployeeBonusActionComponent', () => {
  let component: EmployeeBonusActionComponent;
  let fixture: ComponentFixture<EmployeeBonusActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBonusActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBonusActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
