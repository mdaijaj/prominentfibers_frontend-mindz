import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBonusDilogComponent } from './emp-bonus-dilog.component';

describe('EmpBonusDilogComponent', () => {
  let component: EmpBonusDilogComponent;
  let fixture: ComponentFixture<EmpBonusDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBonusDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBonusDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
