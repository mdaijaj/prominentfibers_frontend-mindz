import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierAcceptanceRejectionComponent } from './courier-acceptance-rejection.component';

describe('CourierAcceptanceRejectionComponent', () => {
  let component: CourierAcceptanceRejectionComponent;
  let fixture: ComponentFixture<CourierAcceptanceRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierAcceptanceRejectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierAcceptanceRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
