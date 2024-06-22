import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCostComponent } from './approved-cost.component';

describe('ApprovedCostComponent', () => {
  let component: ApprovedCostComponent;
  let fixture: ComponentFixture<ApprovedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
