import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryProcessListComponent } from './salary-process-list.component';

describe('SalaryProcessListComponent', () => {
  let component: SalaryProcessListComponent;
  let fixture: ComponentFixture<SalaryProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryProcessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
