import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelActionComponent } from './travel-action.component';

describe('TravelActionComponent', () => {
  let component: TravelActionComponent;
  let fixture: ComponentFixture<TravelActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
