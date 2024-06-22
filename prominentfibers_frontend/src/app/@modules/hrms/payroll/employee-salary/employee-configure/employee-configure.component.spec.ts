import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConfigureComponent } from './employee-configure.component';

describe('EmployeeConfigureComponent', () => {
  let component: EmployeeConfigureComponent;
  let fixture: ComponentFixture<EmployeeConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeConfigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
