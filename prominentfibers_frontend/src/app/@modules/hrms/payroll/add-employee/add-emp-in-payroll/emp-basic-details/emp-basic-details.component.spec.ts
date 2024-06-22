import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBasicDetailsComponent } from './emp-basic-details.component';

describe('EmpBasicDetailsComponent', () => {
  let component: EmpBasicDetailsComponent;
  let fixture: ComponentFixture<EmpBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBasicDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
