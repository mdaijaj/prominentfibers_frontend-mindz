import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelActionsComponent } from './travel-actions.component';

describe('TravelActionsComponent', () => {
  let component: TravelActionsComponent;
  let fixture: ComponentFixture<TravelActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
