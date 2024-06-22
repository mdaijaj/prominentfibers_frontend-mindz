import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceActionComponent } from './insurance-action.component';

describe('InsuranceActionComponent', () => {
  let component: InsuranceActionComponent;
  let fixture: ComponentFixture<InsuranceActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
