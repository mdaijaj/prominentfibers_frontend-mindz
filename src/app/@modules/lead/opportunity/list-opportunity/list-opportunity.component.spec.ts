import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityListComponent } from './list-opportunity.component';

describe('OpportunityListComponent', () => {
  let component: OpportunityListComponent;
  let fixture: ComponentFixture<OpportunityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
