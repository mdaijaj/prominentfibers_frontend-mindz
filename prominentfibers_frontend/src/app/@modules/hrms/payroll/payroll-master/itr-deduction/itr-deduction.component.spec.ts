import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrDeductionComponent } from './itr-deduction.component';

describe('ItrDeductionComponent', () => {
  let component: ItrDeductionComponent;
  let fixture: ComponentFixture<ItrDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
