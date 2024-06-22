import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTeamSuspComponent } from './planning-team-susp.component';

describe('PlanningTeamSuspComponent', () => {
  let component: PlanningTeamSuspComponent;
  let fixture: ComponentFixture<PlanningTeamSuspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTeamSuspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningTeamSuspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
