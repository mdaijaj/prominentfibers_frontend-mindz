import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSeeDetailsComponent } from './emp-see-details.component';

describe('EmpSeeDetailsComponent', () => {
  let component: EmpSeeDetailsComponent;
  let fixture: ComponentFixture<EmpSeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSeeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
