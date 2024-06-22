import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTravelRequestComponent } from './confirm-travel-request.component';

describe('ConfirmTravelRequestComponent', () => {
  let component: ConfirmTravelRequestComponent;
  let fixture: ComponentFixture<ConfirmTravelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTravelRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
