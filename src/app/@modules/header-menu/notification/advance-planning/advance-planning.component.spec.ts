import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePlanningComponent } from './advance-planning.component';

describe('AdvancePlanningComponent', () => {
  let component: AdvancePlanningComponent;
  let fixture: ComponentFixture<AdvancePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancePlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
