import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityExistCustComponent } from './opportunity-exist-cust.component';

describe('OpportunityExistCustComponent', () => {
  let component: OpportunityExistCustComponent;
  let fixture: ComponentFixture<OpportunityExistCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityExistCustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityExistCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
