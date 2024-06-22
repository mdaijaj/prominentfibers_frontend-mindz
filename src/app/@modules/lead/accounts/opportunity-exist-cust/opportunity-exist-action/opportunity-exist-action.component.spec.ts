import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityExistActionComponent } from './opportunity-exist-action.component';

describe('OpportunityExistActionComponent', () => {
  let component: OpportunityExistActionComponent;
  let fixture: ComponentFixture<OpportunityExistActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityExistActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityExistActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
