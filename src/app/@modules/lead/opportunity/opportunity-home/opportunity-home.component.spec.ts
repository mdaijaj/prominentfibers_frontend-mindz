import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityHome } from './opportunity-home.component';

describe('OpportunityHome', () => {
  let component: OpportunityHome;
  let fixture: ComponentFixture<OpportunityHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityHome ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
